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

const propertyEvaluator = (context, typeForMessage) => {
    const {always} = parseOptions(context);

    const sourceCode = context.getSourceCode();

    return (node) => {
        const parameterName = getParameterName(node, context);
        const typeAnnotation = _.get(node, 'typeAnnotation') || _.get(node, 'left.typeAnnotation');

        if (typeAnnotation) {
            // tokenBeforeType can be the identifier or the closing } token of a destructuring
            const tokenBeforeType = sourceCode.getTokenBefore(typeAnnotation, node.optional ? 1 : 0);
            const spaceBefore = typeAnnotation.start - tokenBeforeType.end - (node.optional ? 1 : 0);

            if (always && spaceBefore > 1) {
                context.report(node, 'There must be 1 space before "' + parameterName + '" ' + typeForMessage + ' type annotation colon.');
            } else if (always && spaceBefore === 0) {
                context.report(node, 'There must be a space before "' + parameterName + '" ' + typeForMessage + ' type annotation colon.');
            } else if (!always && spaceBefore > 0) {
                context.report(node, 'There must be no space before "' + parameterName + '" ' + typeForMessage + ' type annotation colon.');
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

    return (objectTypeProperty) => {
        // tokenBeforeColon can be identifier, or a ? token if is optional
        const tokenBeforeColon = sourceCode.getFirstToken(objectTypeProperty, objectTypeProperty.optional ? 1 : 0);
        const colon = sourceCode.getFirstToken(objectTypeProperty, objectTypeProperty.optional ? 2 : 1);
        const name = getParameterName(objectTypeProperty, context);

        const spaceBefore = colon.start - tokenBeforeColon.end;

        if (always && spaceBefore > 1) {
            context.report(objectTypeProperty, 'There must be 1 space before "' + name + '" type annotation colon.');
        } else if (always && spaceBefore === 0) {
            context.report(objectTypeProperty, 'There must be a space before "' + name + '" type annotation colon.');
        } else if (!always && spaceBefore > 0) {
            context.report(objectTypeProperty, 'There must be no space before "' + name + '" type annotation colon.');
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
