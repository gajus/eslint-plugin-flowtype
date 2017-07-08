import _ from 'lodash';
import {
    isFlowFile,
    quoteName
} from './../utilities';

const schema = [
  {
    additionalProperties: false,
    properties: {
      excludeVariableMatch: {
        type: 'string'
      },
      excludeVariableTypes: {
        additionalProperties: false,
        properties: {
          const: {
            type: 'boolean'
          },
          let: {
            type: 'boolean'
          },
          var: {
            type: 'boolean'
          }
        },
        type: 'object'
      }
    },
    type: 'object'
  }
];

const create = (context) => {
  const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

  if (!checkThisFile) {
    return () => {};
  }

  const excludeVariableMatch = new RegExp(_.get(context, 'options[0].excludeVariableMatch', 'a^'));
  const excludeVariableTypes = _.get(context, 'options[0].excludeVariableTypes', {});

  return {
    VariableDeclaration: (variableDeclaration) => {
      const variableType = _.get(variableDeclaration, 'kind');

      if (_.get(excludeVariableTypes, variableType)) {
        return;
      }

      _.forEach(variableDeclaration.declarations, (variableDeclarator) => {
        const identifierNode = _.get(variableDeclarator, 'id');
        const identifierName = _.get(identifierNode, 'name');

        if (excludeVariableMatch.test(identifierName)) {
          return;
        }

        const typeAnnotation = _.get(identifierNode, 'typeAnnotation');

        if (!typeAnnotation) {
          context.report({
            data: {
              name: quoteName(identifierName)
            },
            message: 'Missing {{name}}variable type annotation.',
            node: identifierNode
          });
        }
      });
    }
  };
};

export default {
  create,
  schema
};
