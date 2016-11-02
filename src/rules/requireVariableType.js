import _ from 'lodash';
import {
    isFlowFile,
    quoteName
} from './../utilities';

export default (context) => {
  const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

  if (!checkThisFile) {
    return () => {};
  }

  const excludeVariableMatch = new RegExp(_.get(context, 'options[0].excludeVariableMatch', 'a^'));

  return {
    VariableDeclaration: (variableDeclaration) => {
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
