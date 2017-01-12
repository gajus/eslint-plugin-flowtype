import _ from 'lodash';
import {
    getParameterName,
    getTypeAliases,
    iterateFunctionNodes,
    quoteName
} from './../utilities';

export default iterateFunctionNodes((context) => {
  const skipArrows = _.get(context, 'options[0].excludeArrowFunctions');
  const excludeParameterMatch = new RegExp(_.get(context, 'options[0].excludeParameterMatch', 'a^'));

  const getFunctionAnnotation = (functionNode) => {
    const typeAliasNodes = getTypeAliases(context);
    const idName = _.get(functionNode, 'parent.id.typeAnnotation.typeAnnotation.id.name');

    return _.find(typeAliasNodes, (node) => {
      return _.get(node, 'id.name') === idName;
    });
  };

  return (functionNode) => {
    // It is save to ignore FunctionTypeAnnotation nodes in this rule.
    if (functionNode.type === 'FunctionTypeAnnotation') {
      return;
    }

    const isArrow = functionNode.type === 'ArrowFunctionExpression';
    const isArrowFunctionExpression = functionNode.expression;
    const functionAnnotation = isArrow && getFunctionAnnotation(functionNode);

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
        // Check each of the params in the annotation against the current parameter name
        typeAnnotation = _.find(functionAnnotation.right.params, (node) => {
          return getParameterName(node, context) === parameterName;
        });
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
