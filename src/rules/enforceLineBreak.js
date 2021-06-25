const schema = [];

const create = (context) => {
  return {
    TypeAlias (node) {
      const sourceCode = context.getSourceCode();

      // if type alias has spacing above and below cancel out of checks
      // Check for comments above the line (if there is a comment then add the space above that instead)
      if (node.loc.start.line !== 1) {
        // Check if there are comments above the line
        if (node.leadingComments) {
          const lineAboveComment = sourceCode.lines[node.leadingComments[0].loc.start.line - 2];
          if (lineAboveComment !== '') {
            context.report({
              fix (fixer) {
                return fixer.insertTextBeforeRange(node.leadingComments[0].range, '\n');
              },
              message: 'Please enter a line above type declaration',
              node,
            });
          }
        } else if (!node.leadingComments) {
          const lineAbove = sourceCode.lines[node.loc.start.line - 2];

          // there are no comments add space above line
          if (lineAbove !== '') {
            context.report({
              fix (fixer) {
                return fixer.insertTextBefore(node, '\n');
              },
              message: 'Please enter a line above type declaration',
              node,
            });
          }
        }

        // Check if there is a space under the line
        const lineBelow = sourceCode.lines[node.loc.end.line];

        if (lineBelow !== '') {
          context.report({
            fix (fixer) {
              return fixer.insertTextAfter(node, '\n');
            },
            message: 'Please enter a line below type declaration',
            node,
          });
        }
      }
    },
  };
};

export default {
  create,
  meta: {
    fixable: 'code',
  },
  schema,
};
