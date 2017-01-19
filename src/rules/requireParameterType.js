import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes,
    quoteName
} from './../utilities';

export default iterateFunctionNodes((context) => {
  const skipArrows = _.get(context, 'options[0].excludeArrowFunctions');
  const excludeParameterMatch = new RegExp(_.get(context, 'options[0].excludeParameterMatch', 'a^'));

  return (functionNode) => {
    // It is save to ignore FunctionTypeAnnotation nodes in this rule.
    if (functionNode.type === 'FunctionTypeAnnotation') {
      return;
    }

    const isArrow = functionNode.type === 'ArrowFunctionExpression';
    const isArrowFunctionExpression = functionNode.expression;
    const functionAnnotation = isArrow && _.get(functionNode, 'parent.id.typeAnnotation');

    if (skipArrows === 'expressionsOnly' && isArrowFunctionExpression || skipArrows === true && isArrow) {
      return;
    }

    _.forEach(functionNode.params, (identifierNode) => {
      const parameterName = getParameterName(identifierNode, context);

      if (excludeParameterMatch.test(parameterName)) {
        return;
      }

      let typeAnnotation;

      typeAnnotation = _.get(identifierNode, 'typeAnnotation') || _.get(identifierNode, 'left.typeAnnotation');

      if (isArrow && functionAnnotation) {
        typeAnnotation = true;
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
