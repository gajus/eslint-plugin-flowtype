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

const propertyEvaluator = (context, typeForMessage) => {
    const {always} = parseOptions(context);

    const sourceCode = context.getSourceCode();

    return (node) => {
        const parameterName = getParameterName(node, context);
        const typeAnnotation = _.get(node, 'typeAnnotation') || _.get(node, 'left.typeAnnotation');

        if (typeAnnotation) {
            const token = sourceCode.getFirstToken(typeAnnotation, 1);
            const spaceAfter = token.start - typeAnnotation.start - 1;

            if (always && spaceAfter > 1) {
                context.report(node, 'There must be 1 space after "' + parameterName + '" ' + typeForMessage + ' type annotation colon.');
            } else if (always && spaceAfter === 0) {
                context.report(node, 'There must be a space after "' + parameterName + '" ' + typeForMessage + ' type annotation colon.');
            } else if (!always && spaceAfter > 0) {
                context.report(node, 'There must be no space after "' + parameterName + '" ' + typeForMessage + ' type annotation colon.');
            }
        }
    };
};

const returnTypeEvaluator = (context) => {
    const {always} = parseOptions(context);

    const sourceCode = context.getSourceCode();

    return (functionNode) => {
        if (functionNode.returnType) {
            const token = sourceCode.getFirstToken(functionNode.returnType, 1);
            const spaceAfter = token.start - functionNode.returnType.start - 1;

            if (always && spaceAfter > 1) {
                context.report(functionNode, 'There must be 1 space after return type colon.');
            } else if (always && spaceAfter === 0) {
                context.report(functionNode, 'There must be a space after return type colon.');
            } else if (!always && spaceAfter > 0) {
                context.report(functionNode, 'There must be no space after return type colon.');
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
            context.report(objectTypeProperty, 'There must be 1 space after "' + name + '" type annotation colon.');
        } else if (always && spaceAfter === 0) {
            context.report(objectTypeProperty, 'There must be a space after "' + name + '" type annotation colon.');
        } else if (!always && spaceAfter > 0) {
            context.report(objectTypeProperty, 'There must be no space after "' + name + '" type annotation colon.');
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
