const schema = [];

const create = (context) => {
  return {
    TypeAlias (node) {
      const sourceCode = context.getSourceCode();
      if (sourceCode.lines.length === 1) {
        return;
      }

      if (node.loc.start.line !== 1) {
        if (node.leadingComments && node.leadingComments[0].loc.start.line !== 1) {
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
          const isLineAbove = sourceCode.lines[node.loc.start.line - 2];
          if (isLineAbove !== '') {
            context.report({
              fix (fixer) {
                return fixer.insertTextBefore(node, '\n');
              },
              message: 'Please enter a line above type declaration',
              node,
            });
          }
        }
      }

      if (sourceCode.lines.length !== node.loc.end.line) {
        const isLineBelow = sourceCode.lines[node.loc.end.line];
        if (isLineBelow !== '') {
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
