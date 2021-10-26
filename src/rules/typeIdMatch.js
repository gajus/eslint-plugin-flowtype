const schema = [
  {
    type: 'string',
  },
];

const create = (context) => {
  const pattern = new RegExp(context.options[0] || '^([A-Z][a-z0-9]*)+Type$', 'u');

  const checkType = (typeAliasNode) => {
    const typeIdentifierName = typeAliasNode.id.name;

    if (!pattern.test(typeIdentifierName)) {
      context.report({data: {
        name: typeIdentifierName,
        pattern: pattern.toString(),
      },
      message: 'Type identifier \'{{name}}\' does not match pattern \'{{pattern}}\'.',
      node: typeAliasNode});
    }
  };

  return {
    OpaqueType: checkType,
    TypeAlias: checkType,
  };
};

export default {
  create,
  schema,
};
