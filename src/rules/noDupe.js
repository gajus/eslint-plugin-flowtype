import _ from 'lodash/';

export default (context) => {
  const sourceCode = context.getSourceCode();

  const report = (node) => {
    context.report({
      loc: node.loc,
      message: 'Duplicate property.',
      node
    });
  };

  const checkForDuplicates = (node) => {
    const tokens = [];

      const line = sourceCode.getText(identifierNode).replace(',', '');
    _.forEach(node.properties, (identifierNode) => {

      if (_.includes(tokens, line)) {
        report(identifierNode);
      } else {
        tokens.push(line);
      }
    });
  };

  return {
    ObjectTypeAnnotation: checkForDuplicates
  };
};
