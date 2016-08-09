import _ from 'lodash';
import {
    getParameterName,
    isFlowFile,
    iterateFunctionNodes
} from './../utilities';

export default iterateFunctionNodes((context) => {
    const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

    if (!checkThisFile) {
        return () => {};
    }

    const skipArrows = _.get(context, 'options[0].excludeArrowFunctions');

    return (functionNode) => {
        _.forEach(functionNode.params, (identifierNode) => {
            const parameterName = getParameterName(identifierNode, context);
            const typeAnnotation = _.get(identifierNode, 'typeAnnotation') || _.get(identifierNode, 'left.typeAnnotation');
            const shouldSkip = functionNode.type === 'ArrowFunctionExpression' && skipArrows;

            if (!typeAnnotation && !shouldSkip) {
                context.report(identifierNode, 'Missing "' + parameterName + '" parameter type annotation.');
            }
        });
    };
});
