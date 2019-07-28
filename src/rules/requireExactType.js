const schema = [
  {
    enum: ['always', 'never'],
    type: 'string',
  },
];

const create = (context) => {
  const always = (context.options[0] || 'always') === 'always';

  return {
    TypeAlias (node) {
      const {id: {name}, right: {type, exact, indexers}} = node;

      if (type === 'ObjectTypeAnnotation') {
        if (always && !exact && indexers.length === 0) {
          context.report({
            data: {name},
            message: 'Type identifier \'{{name}}\' must be exact.',
            node,
          });
        }

        if (!always && exact) {
          context.report({
            data: {name},
            message: 'Type identifier \'{{name}}\' must not be exact.',
            node,
          });
        }
      }
    },
  };
};

export default {
  create,
  schema,
};
