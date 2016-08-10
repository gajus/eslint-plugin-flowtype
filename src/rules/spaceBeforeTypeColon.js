import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes
} from './../utilities';

export default iterateFunctionNodes((context) => {
    const always = context.options[0] === 'always';

    const sourceCode = context.getSourceCode();

    return (functionNode) => {
        _.forEach(functionNode.params, (identifierNode) => {
            const parameterName = getParameterName(identifierNode, context);
            const typeAnnotation = _.get(identifierNode, 'typeAnnotation') || _.get(identifierNode, 'left.typeAnnotation');

            if (typeAnnotation) {
                const tokenBeforeType = sourceCode.getTokenBefore(typeAnnotation, identifierNode.optional ? 1 : 0);
                const spaceBefore = typeAnnotation.start - tokenBeforeType.end - (identifierNode.optional ? 1 : 0);

                if (always && spaceBefore > 1) {
                    context.report(identifierNode, 'There must be 1 space before "' + parameterName + '" parameter type annotation colon.');
                } else if (always && spaceBefore === 0) {
                    context.report(identifierNode, 'There must be a space before "' + parameterName + '" parameter type annotation colon.');
                } else if (!always && spaceBefore > 0) {
                    context.report(identifierNode, 'There must be no space before "' + parameterName + '" parameter type annotation colon.');
                }
            }
        });
    };
});
