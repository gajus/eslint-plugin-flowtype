import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes,
    quoteName
} from './../utilities';

const schema = [
  {
    additionalProperties: false,
    properties: {
      excludeArrowFunctions: {
        enum: [false, true, 'expressionsOnly']
      },
      excludeParameterMatch: {
        type: 'string'
      }
    },
    type: 'object'
  }
];

const create = iterateFunctionNodes((context) => {
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

export default {
  create,
  schema
};
