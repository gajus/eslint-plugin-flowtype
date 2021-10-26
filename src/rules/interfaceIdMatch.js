const schema = [
  {
    type: 'string',
  },
];

const create = (context) => {
  const pattern = new RegExp(context.options[0] || '^([A-Z][a-z0-9]*)+Type$', 'u');

  const checkInterface = (interfaceDeclarationNode) => {
    const interfaceIdentifierName = interfaceDeclarationNode.id.name;

    if (!pattern.test(interfaceIdentifierName)) {
      context.report({data: {
        name: interfaceIdentifierName,
        pattern: pattern.toString(),
      },
      message: 'Interface identifier \'{{name}}\' does not match pattern \'{{pattern}}\'.',
      node: interfaceDeclarationNode});
    }
  };

  return {
    InterfaceDeclaration: checkInterface,
  };
};

export default {
  create,
  schema,
};
