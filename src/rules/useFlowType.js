const schema = [];

const create = (context) => {
  const markTypeAsUsed = (node) => {
    context.markVariableAsUsed(node.id.name);
  };

  return {
    DeclareClass: markTypeAsUsed,
    DeclareFunction: markTypeAsUsed,
    DeclareModule: markTypeAsUsed,
    DeclareVariable: markTypeAsUsed,
    GenericTypeAnnotation (node) {
      let typeId;
      let scope;
      let variable;

      if (node.id.type === 'Identifier') {
        typeId = node.id;
      } else if (node.id.type === 'QualifiedTypeIdentifier') {
        typeId = node.id;
        do {
          typeId = typeId.qualification;
        } while (typeId.qualification);
      }

      for (scope = context.getScope(); scope; scope = scope.upper) {
        variable = scope.set.get(typeId.name);
        if (variable && variable.defs.length) {
          context.markVariableAsUsed(typeId.name);
          break;
        }
      }
    }
  };
};

export default {
  create,
  schema
};
