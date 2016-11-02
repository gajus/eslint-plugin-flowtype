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

  return {
    VariableDeclaration: (variableDeclaration) => {
      _.forEach(variableDeclaration.declarations, (variableDeclarator) => {
        const identifierNode = _.get(variableDeclarator, 'id');
        const typeAnnotation = _.get(identifierNode, 'typeAnnotation');
        const identifierName = _.get(identifierNode, 'name');

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
