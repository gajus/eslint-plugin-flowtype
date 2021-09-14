import {
  isFlowFile,
} from '../utilities';

/**
 * Disallows the use for flow types without a valid file annotation.
 * Only checks files without a valid flow annotation.
 */

const schema = [];

const create = (context) => {
  // Skip flow files
  if (isFlowFile(context, false)) {
    return {};
  }

  const reporter = (node, type) => {
    context.report({
      data: {type},
      message: 'Type {{type}} require valid Flow declaration.',
      node,
    });
  };

  return {
    ExportNamedDeclaration (node) {
      if (node.exportKind === 'type') {
        reporter(node, 'exports');
      }
    },
    ImportDeclaration (node) {
      if (node.importKind === 'type') {
        reporter(node, 'imports');
      }
      if (node.importKind === 'value' &&
      node.specifiers.some((specifier) => {
        return specifier.importKind === 'type';
      })) {
        reporter(node, 'imports');
      }
    },
    TypeAlias (node) {
      reporter(node, 'aliases');
    },
    TypeAnnotation (node) {
      reporter(node, 'annotations');
    },
  };
};

export default {
  create,
  schema,
};
