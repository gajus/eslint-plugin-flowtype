const schema = [
  {
    type: 'string',
  },
];

const create = (context) => {
  const pattern = new RegExp(context.options[0] || '^([A-Z][a-z0-9]*)+Type$');

  const checkType = (interfaceDeclarationNode) => {
    const typeIdentifierName = interfaceDeclarationNode.id.name;

    if (!pattern.test(typeIdentifierName)) {
      context.report(interfaceDeclarationNode, 'Type identifier \'{{name}}\' does not match pattern \'{{pattern}}\'.', {
        name: typeIdentifierName,
        pattern: pattern.toString(),
      });
    }
  };

  return {
    InterfaceDeclaration: checkType,
  };
};

export default {
  create,
  schema,
};
