/**
 * Disallows the use for flow types without a valid file annotation.
 * Only checks files without a valid @flow annotation.
 */

export default (context) => {
  const reporter = (node, type) => {
    context.report({
      data: {type},
      message: 'Type {{type}} require valid Flow declaration.',
      node
    });
  };

  return {
    ImportDeclaration (node) {
      if (node.importKind === 'type') {
        reporter(node, 'imports');
      }
    },
    TypeAlias (node) {
      reporter(node, 'aliases');
    },
    TypeAnnotation (node) {
      reporter(node, 'annotations');
    }
  };
};
