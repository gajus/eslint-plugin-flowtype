const schema = [];

const create = (context) => {
  return {
    ArrayTypeAnnotation (node) {
      context.report({
        fix (fixer) {
          const rawElementType = context.getSourceCode().getText(node.elementType);

          return fixer.replaceText(node, '$ReadOnlyArray<' + rawElementType + '>');
        },
        message: 'Use "$ReadOnlyArray" instead of array shorthand notation',
        node
      });
    },
    GenericTypeAnnotation (node) {
      if (node.id.name === 'Array') {
        context.report({
          fix (fixer) {
            return fixer.replaceText(node.id, '$ReadOnlyArray');
          },
          message: 'Use "$ReadOnlyArray" instead of "Array"',
          node
        });
      }
    }
  };
};

export default {
  create,
  schema
};
