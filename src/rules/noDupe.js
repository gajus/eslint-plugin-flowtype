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

    _.forEach(node.properties, (identifierNode) => {
      const line = sourceCode.getFirstToken(identifierNode).value;

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
