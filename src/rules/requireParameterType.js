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

            const isArrow = functionNode.type === 'ArrowFunctionExpression';
            const isArrowFunctionExpression = functionNode.expression;

            if (skipArrows === 'expressionsOnly' && isArrowFunctionExpression || skipArrows === true && isArrow) {
                return;
            }

            if (!typeAnnotation) {
                context.report(identifierNode, 'Missing "' + parameterName + '" parameter type annotation.');
            }
        });
    };
});
