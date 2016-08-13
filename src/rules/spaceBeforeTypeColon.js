import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes
} from './../utilities';

const parseOptions = (context) => {
    return {
        always: context.options[0] === 'always'
    };
};

const FIXERS = {
    ensureNoSpaces: (tokenBeforeType, spaceBefore) => {
        return (fixer) => {
            return fixer.removeRange([tokenBeforeType.end, tokenBeforeType.end + spaceBefore]);
        };
    },
    ensureOneSpace: (tokenBeforeType, spaceBefore) => {
        return (fixer) => {
            return fixer.removeRange([tokenBeforeType.end, tokenBeforeType.end + spaceBefore - 1]);
        };
    },
    ensureSpace: (tokenBeforeType) => {
        return (fixer) => {
            return fixer.insertTextAfter(tokenBeforeType, ' ');
        };
    }
};

const propertyEvaluator = (context, typeForMessage) => {
    const {always} = parseOptions(context);

    const sourceCode = context.getSourceCode();

    const getSpacesBeforeColon = (node, typeAnnotation) => {
        if (node.type === 'FunctionTypeParam') {
            // the colon isn't included in the typeAnnotation node here...
            const colon = sourceCode.getTokenBefore(typeAnnotation);
            const tokenBeforeColon = sourceCode.getTokenBefore(colon);

            return {
                spaceBefore: colon.start - tokenBeforeColon.end,
                tokenBeforeType: tokenBeforeColon
            };
        } else {
            // tokenBeforeColon can be the identifier or the closing } token of a destructuring
            const tokenBeforeColon = sourceCode.getTokenBefore(typeAnnotation);

            return {
                spaceBefore: typeAnnotation.start - tokenBeforeColon.end,
                tokenBeforeType: tokenBeforeColon
            };
        }
    };

    return (node) => {
        const parameterName = getParameterName(node, context);
        const typeAnnotation = _.get(node, 'typeAnnotation') || _.get(node, 'left.typeAnnotation');

        if (typeAnnotation) {
            // tokenBeforeType can be the identifier or the closing } token of a destructuring
            const {spaceBefore, tokenBeforeType} = getSpacesBeforeColon(node, typeAnnotation);

            if (always && spaceBefore > 1) {
                context.report({
                    fix: FIXERS.ensureOneSpace(tokenBeforeType, spaceBefore),
                    message: 'There must be 1 space before "' + parameterName + '" ' + typeForMessage + ' type annotation colon.',
                    node
                });
            } else if (always && spaceBefore === 0) {
                context.report({
                    fix: FIXERS.ensureSpace(tokenBeforeType),
                    message: 'There must be a space before "' + parameterName + '" ' + typeForMessage + ' type annotation colon.',
                    node
                });
            } else if (!always && spaceBefore > 0) {
                context.report({
                    fix: FIXERS.ensureNoSpaces(tokenBeforeType, spaceBefore),
                    message: 'There must be no space before "' + parameterName + '" ' + typeForMessage + ' type annotation colon.',
                    node
                });
            }
        }
    };
};

const functionEvaluators = iterateFunctionNodes((context) => {
    const checkParam = propertyEvaluator(context, 'parameter');

    return (functionNode) => {
        _.forEach(functionNode.params, checkParam);
    };
});

const objectTypePropertyEvaluator = (context) => {
    const {always} = parseOptions(context);

    const sourceCode = context.getSourceCode();

    const getFirstTokens = (objectTypeProperty) => {
        const tokens = sourceCode.getFirstTokens(objectTypeProperty, 3);

        if (objectTypeProperty.optional) {
            return [tokens[1], tokens[2]];
        } else {
            return [tokens[0], tokens[1]];
        }
    };

    return (objectTypeProperty) => {
        // tokenBeforeColon can be identifier, or a ? token if is optional
        const [tokenBeforeColon, colon] = getFirstTokens(objectTypeProperty);
        const name = getParameterName(objectTypeProperty, context);

        const spaceBefore = colon.start - tokenBeforeColon.end;

        if (always && spaceBefore > 1) {
            context.report({
                fix: FIXERS.ensureOneSpace(tokenBeforeColon, spaceBefore),
                message: 'There must be 1 space before "' + name + '" type annotation colon.',
                node: objectTypeProperty
            });
        } else if (always && spaceBefore === 0) {
            context.report({
                fix: FIXERS.ensureSpace(tokenBeforeColon),
                message: 'There must be a space before "' + name + '" type annotation colon.',
                node: objectTypeProperty
            });
        } else if (!always && spaceBefore > 0) {
            context.report({
                fix: FIXERS.ensureNoSpaces(tokenBeforeColon, spaceBefore),
                message: 'There must be no space before "' + name + '" type annotation colon.',
                node: objectTypeProperty
            });
        }
    };
};

export default (context) => {
    return {
        ...functionEvaluators(context),
        ClassProperty: propertyEvaluator(context, 'class property'),
        ObjectTypeProperty: objectTypePropertyEvaluator(context)
    };
};
