const schema = [
  {
    type: 'string',
  },
];

const create = (context) => {
  const pattern = new RegExp(context.options[0] || '^([A-Z][a-z0-9]*)+Type$');

  const checkInterface = (interfaceDeclarationNode) => {
    const interfaceIdentifierName = interfaceDeclarationNode.id.name;

    if (!pattern.test(interfaceIdentifierName)) {
      context.report(interfaceDeclarationNode, 'Interface identifier \'{{name}}\' does not match pattern \'{{pattern}}\'.', {
        name: interfaceIdentifierName,
        pattern: pattern.toString(),
      });
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
