const schema = [
  {
    enum: ['always', 'never'],
    type: 'string',
  },
];

const create = (context) => {
  return {
    ObjectTypeAnnotation (node) {
      const {properties} = node;

      properties.forEach((property) => {
        const {type} = property;
        if (type === 'ObjectTypeSpreadProperty') {
          const {argument: {type: argumentType, id: argumentId}} = property;
          if (
            argumentType !== 'GenericTypeAnnotation' || argumentId.name !== '$Exact') {
            context.report({
              message: 'Use $Exact to make type spreading safe.',
              node,
            });
          }
        }
      });
    },
  };
};

export default {
  create,
  schema,
};
