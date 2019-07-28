const schema = [
  {
    enum: ['always', 'never'],
    type: 'string',
  },
];

const create = (context) => {
  const always = (context.options[0] || 'always') === 'always';

  return {
    ObjectTypeAnnotation (node) {
      const {inexact, exact} = node;

      if (!node.hasOwnProperty('inexact')) {
        return;
      }

      if (always && !inexact && !exact) {
        context.report({
          message: 'Type must be explicit inexact.',
          node,
        });
      }

      if (!always && inexact) {
        context.report({
          message: 'Type must not be explicit inexact.',
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
