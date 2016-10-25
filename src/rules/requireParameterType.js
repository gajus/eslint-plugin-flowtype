import _ from 'lodash';
import {
    getParameterName,
    isFlowFile,
    iterateFunctionNodes,
    quoteName
} from './../utilities';

export default iterateFunctionNodes((context) => {
  const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

  if (!checkThisFile) {
    return () => {};
  }

  const skipArrows = _.get(context, 'options[0].excludeArrowFunctions');
  const excludeParameterMatch = new RegExp(_.get(context, 'options[0].excludeParameterMatch', 'a^'));

  return (functionNode) => {
    _.forEach(functionNode.params, (identifierNode) => {
      const parameterName = getParameterName(identifierNode, context);

      if (excludeParameterMatch.test(parameterName)) {
        return;
      }

      const typeAnnotation = _.get(identifierNode, 'typeAnnotation') || _.get(identifierNode, 'left.typeAnnotation');

      const isArrow = functionNode.type === 'ArrowFunctionExpression';
      const isArrowFunctionExpression = functionNode.expression;

      if (skipArrows === 'expressionsOnly' && isArrowFunctionExpression || skipArrows === true && isArrow) {
        return;
      }

      if (!typeAnnotation) {
        context.report({
          data: {
            name: quoteName(parameterName)
          },
          message: 'Missing {{name}}parameter type annotation.',
          node: identifierNode
        });
      }
    });
  };
});
