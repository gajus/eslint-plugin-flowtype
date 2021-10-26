import _ from 'lodash';
import {
  getParameterName,
  iterateFunctionNodes,
  quoteName,
} from '../utilities';

const schema = [
  {
    additionalProperties: false,
    properties: {
      excludeArrowFunctions: {
        enum: [false, true, 'expressionsOnly'],
      },
      excludeParameterMatch: {
        type: 'string',
      },
    },
    type: 'object',
  },
];

const create = iterateFunctionNodes((context) => {
  const skipArrows = _.get(context, 'options[0].excludeArrowFunctions');
  const excludeParameterMatch = new RegExp(_.get(context, 'options[0].excludeParameterMatch', 'a^'), 'u');

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

    // eslint-disable-next-line unicorn/no-array-for-each
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
            name: quoteName(parameterName),
          },
          message: 'Missing {{name}}parameter type annotation.',
          node: identifierNode,
        });
      }
    });
  };
});

export default {
  create,
  schema,
};
