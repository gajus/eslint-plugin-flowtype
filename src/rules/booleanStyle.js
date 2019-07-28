const schema = [
  {
    enum: ['bool', 'boolean'],
    type: 'string',
  },
];

const create = (context) => {
  const longForm = (context.options[0] || 'boolean') === 'boolean';

  return {
    BooleanTypeAnnotation (node) {
      const diff = node.end - node.start;

      if (longForm && diff === 4) {
        context.report({
          fix (fixer) {
            return fixer.replaceText(node, 'boolean');
          },
          message: 'Use "boolean", not "bool"',
          node,
        });
      }

      if (!longForm && diff !== 4) {
        context.report({
          fix (fixer) {
            return fixer.replaceText(node, 'bool');
          },
          message: 'Use "bool", not "boolean"',
          node,
        });
      }
    },
  };
};

export default {
  create,
  schema,
};
