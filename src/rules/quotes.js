const schema = [
  {
    enum: ['double', 'single'],
    type: 'string',
  },
];

const meta = {
  fixable: 'code',
};

const create = (context) => {
  const double = (context.options[0] || 'double') === 'double';
  const sourceCode = context.getSourceCode();

  return {
    StringLiteralTypeAnnotation (node) {
      if (double && sourceCode.text[node.range[0]] !== '"') {
        // double
        context.report({
          fix: (fixer) => {
            return [
              fixer.replaceTextRange([node.range[0], node.range[0] + 1], '"'),
              fixer.replaceTextRange([node.range[1] - 1, node.range[1]], '"'),
            ];
          },
          message: 'Strings must use double quote.',
          node,
        });
      } else if (!double && sourceCode.text[node.range[0]] !== '\'') {
        // single
        context.report({
          fix: (fixer) => {
            return [
              fixer.replaceTextRange([node.range[0], node.range[0] + 1], '\''),
              fixer.replaceTextRange([node.range[1] - 1, node.range[1]], '\''),
            ];
          },
          message: 'Strings must use single quote.',
          node,
        });
      }
    },
  };
};

export default {
  create,
  meta,
  schema,
};
