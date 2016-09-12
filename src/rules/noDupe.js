import forEach from 'lodash/forEach';
import includes from 'lodash/includes';

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

    forEach(node.properties, (identifierNode) => {
      const line = sourceCode.getText(identifierNode).replace(',', '');

      if (includes(tokens, line)) {
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
