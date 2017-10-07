const schema = [];

const create = (context) => {
  const markTypeAsUsed = (node) => {
    context.markVariableAsUsed(node.id.name);
  };

  return {
    DeclareClass: markTypeAsUsed,
    DeclareFunction: markTypeAsUsed,
    DeclareModule: markTypeAsUsed,
    DeclareVariable: markTypeAsUsed
  };
};

export default {
  create,
  schema
};
