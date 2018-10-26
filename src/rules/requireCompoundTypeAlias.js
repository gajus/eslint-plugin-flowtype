const schema = [
  {
    enum: ['always', 'never'],
    type: 'string'
  }
];

const create = (context) => {
  const always = (context.options[0] || 'always') === 'always';

  if (always) {
    return {
      IntersectionTypeAnnotation (node) {
        if (node.parent.type !== 'TypeAlias') {
          context.report({
            message: 'All intersection types must be declared with named type alias.',
            node
          });
        }
      },
      UnionTypeAnnotation (node) {
        if (node.parent.type !== 'TypeAlias') {
          context.report({
            message: 'All union types must be declared with named type alias.',
            node
          });
        }
      }
    };
  } else {
    return {};
  }
};

export default {
  create,
  schema
};
