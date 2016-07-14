import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes
} from './../utilities';

export default iterateFunctionNodes((context) => {
    const always = (context.options[0] || 'always') === 'always';

    const sourceCode = context.getSourceCode();

    return (functionNode) => {
        _.forEach(functionNode.params, (identifierNode) => {
            const parameterName = getParameterName(identifierNode, context);
            const typeAnnotation = _.get(identifierNode, 'typeAnnotation') || _.get(identifierNode, 'left.typeAnnotation');

            if (typeAnnotation) {
                const token = sourceCode.getFirstToken(typeAnnotation, 1);
                const spaceAfter = token.start - typeAnnotation.start - 1;

                if (always && spaceAfter > 1) {
                    context.report(identifierNode, 'There must be 1 space after "' + parameterName + '" parameter type annotation colon.');
                } else if (always && spaceAfter === 0) {
                    context.report(identifierNode, 'There must be a space after "' + parameterName + '" parameter type annotation colon.');
                } else if (!always && spaceAfter > 0) {
                    context.report(identifierNode, 'There must be no space after "' + parameterName + '" parameter type annotation colon.');
                }
            }
        });

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
});
