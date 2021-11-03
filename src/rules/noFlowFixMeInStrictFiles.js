const FLOW_STRICT_MATCHER = /^\s*@(?:no)?flow\s*strict(?:-local)?\s*$/u;

const isStrictFlowFile = (context) => {
  return context
    .getAllComments()
    .some((comment) => {
      return FLOW_STRICT_MATCHER.test(comment.value);
    });
};

const message =
  'No suppression comments are allowed in "strict" Flow files. Either remove the error supression, or lower the strictness of this module.';

const create = (context) => {
  if (!isStrictFlowFile(context)) {
    // Skip this file - nothing to check here
    return {};
  }

  return {
    Program: () => {
      const comments = context
        .getSourceCode()
        .getAllComments()
        .filter((node) => {
          return node.type === 'Block' || node.type === 'Line';
        });

      for (const comment of comments) {
        if (/\$FlowFixMe/iu.test(comment.value)) {
          context.report({
            message,
            node: comment,
          });
        }
      }
    },
  };
};

export default {
  create,
};
