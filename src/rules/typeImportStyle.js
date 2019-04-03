const schema = [
  {
    enum: ['declaration', 'identifier'],
    type: 'string'
  },
  {
    additionalProperties: false,
    properties: {
      ignoreTypeDefault: {
        type: 'boolean'
      }
    },
    type: 'object'
  }
];

const create = (context) => {
  if (context.options[0] === 'declaration') {
    return {
      ImportDeclaration (node) {
        if (node.importKind !== 'type') {
          node.specifiers.forEach((specifier) => {
            if (specifier.importKind === 'type') {
              context.report({
                message: 'Unexpected type import',
                node
              });
            }
          });
        }
      }
    };
  } else {
    // Default to 'identifier'
    const ignoreTypeDefault = context.options[1] &&
      context.options[1].ignoreTypeDefault;

    return {
      ImportDeclaration (node) {
        if (node.importKind !== 'type') {
          return;
        }

        if (
          ignoreTypeDefault &&
          node.specifiers[0] &&
          node.specifiers[0].type === 'ImportDefaultSpecifier'
        ) {
          return;
        }

        context.report({
          fix (fixer) {
            const imports = node.specifiers.map((specifier) => {
              if (specifier.type === 'ImportDefaultSpecifier') {
                return 'type default as ' + specifier.local.name;
              } else if (specifier.imported.name === specifier.local.name) {
                return 'type ' + specifier.local.name;
              } else {
                return 'type ' + specifier.imported.name + ' as ' + specifier.local.name;
              }
            });
            const source = node.source.value;

            return fixer.replaceText(node, 'import {' + imports.join(', ') + '} from \'' + source + '\';');
          },
          message: 'Unexpected "import type"',
          node
        });
      }
    };
  }
};

export default {
  create,
  schema
};
