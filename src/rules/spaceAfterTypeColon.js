import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes
} from './../utilities';

const parseOptions = (context) => {
    return {
        always: (context.options[0] || 'always') === 'always'
    };
};

const FIXERS = {
    ensureNoSpaces: (colon, spaceAfter) => {
        return (fixer) => {
            return fixer.removeRange([colon.end, colon.end + spaceAfter]);
        };
    },
    ensureOneSpace: (colon, spaceAfter) => {
        return (fixer) => {
            return fixer.removeRange([colon.end, colon.end + spaceAfter - 1]);
        };
    },
    ensureSpace: (colon) => {
        return (fixer) => {
            return fixer.insertTextAfter(colon, ' ');
        };
    }
};

const propertyEvaluator = (context, typeForMessage) => {
    const {always} = parseOptions(context);

    const sourceCode = context.getSourceCode();

    const getSpacesAfterColon = (node, typeAnnotation) => {
        if (node.type === 'FunctionTypeParam') {
            const colon = sourceCode.getTokenBefore(typeAnnotation);

            return {
                colon,
                spaceAfter: typeAnnotation.start - colon.end
            };
        } else {
            const [colon, token] = sourceCode.getFirstTokens(typeAnnotation, 2);

            return {
                colon,
                spaceAfter: token.start - typeAnnotation.start - 1
            };
        }
    };

    return (node) => {
        const parameterName = getParameterName(node, context);
        const typeAnnotation = _.get(node, 'typeAnnotation') || _.get(node, 'left.typeAnnotation');

        if (typeAnnotation) {
            const {colon, spaceAfter} = getSpacesAfterColon(node, typeAnnotation);

            if (always && spaceAfter > 1) {
                context.report({
                    fix: FIXERS.ensureOneSpace(colon, spaceAfter),
                    message: 'There must be 1 space after "' + parameterName + '" ' + typeForMessage + ' type annotation colon.',
                    node
                });
            } else if (always && spaceAfter === 0) {
                context.report({
                    fix: FIXERS.ensureSpace(colon),
                    message: 'There must be a space after "' + parameterName + '" ' + typeForMessage + ' type annotation colon.',
                    node
                });
            } else if (!always && spaceAfter > 0) {
                context.report({
                    fix: FIXERS.ensureNoSpaces(colon, spaceAfter),
                    message: 'There must be no space after "' + parameterName + '" ' + typeForMessage + ' type annotation colon.',
                    node
                });
            }
        }
    };
};

const returnTypeEvaluator = (context) => {
    const {always} = parseOptions(context);

    const sourceCode = context.getSourceCode();

    return (functionNode) => {
        // skip FunctionTypeAnnotation, possibly another rule as it's an arrow, not a colon?
        // (foo: number) => string
        //              ^^^^
        if (functionNode.returnType && functionNode.type !== 'FunctionTypeAnnotation') {
            const [colon, token] = sourceCode.getFirstTokens(functionNode.returnType, 2);
            const spaceAfter = token.start - functionNode.returnType.start - 1;

            if (always && spaceAfter > 1) {
                context.report({
                    fix: FIXERS.ensureOneSpace(colon, spaceAfter),
                    message: 'There must be 1 space after return type colon.',
                    node: functionNode
                });
            } else if (always && spaceAfter === 0) {
                context.report({
                    fix: FIXERS.ensureSpace(colon),
                    message: 'There must be a space after return type colon.',
                    node: functionNode
                });
            } else if (!always && spaceAfter > 0) {
                context.report({
                    fix: FIXERS.ensureNoSpaces(colon, spaceAfter),
                    message: 'There must be no space after return type colon.',
                    node: functionNode
                });
            }
        }
    };
};

const functionEvaluators = iterateFunctionNodes((context) => {
    const checkParam = propertyEvaluator(context, 'parameter');
    const checkReturnType = returnTypeEvaluator(context);

    return (functionNode) => {
        _.forEach(functionNode.params, checkParam);
        checkReturnType(functionNode);
    };
});

const objectTypePropertyEvaluator = (context) => {
    const {always} = parseOptions(context);

    const sourceCode = context.getSourceCode();

    return (objectTypeProperty) => {
        const colon = sourceCode.getFirstToken(objectTypeProperty, objectTypeProperty.optional ? 2 : 1);
        const typeAnnotation = objectTypeProperty.value;
        const name = getParameterName(objectTypeProperty, context);

        const spaceAfter = typeAnnotation.start - colon.end;

        if (always && spaceAfter > 1) {
            context.report({
                fix: FIXERS.ensureOneSpace(colon, spaceAfter),
                message: 'There must be 1 space after "' + name + '" type annotation colon.',
                node: objectTypeProperty
            });
        } else if (always && spaceAfter === 0) {
            context.report({
                fix: FIXERS.ensureSpace(colon),
                message: 'There must be a space after "' + name + '" type annotation colon.',
                node: objectTypeProperty
            });
        } else if (!always && spaceAfter > 0) {
            context.report({
                fix: FIXERS.ensureNoSpaces(colon, spaceAfter),
                message: 'There must be no space after "' + name + '" type annotation colon.',
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
