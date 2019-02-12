const schema = [
  {
    enum: ['declaration', 'identifier', 'prefer-declaration'],
    type: 'string'
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
  } else if (context.options[0] === 'prefer-declaration') {
    return {
      ImportDeclaration (node) {
        if (node.importKind !== 'type') {
          if (node.specifiers.length && node.specifiers.every((specifier) => {
            return specifier.importKind === 'type';
          })) {
            context.report({
              fix (fixer) {
                const imports = node.specifiers.map((specifier) => {
                  if (specifier.type === 'ImportDefaultSpecifier') {
                    return 'default as ' + specifier.local.name;
                  } else if (specifier.imported.name === specifier.local.name) {
                    return specifier.local.name;
                  } else {
                    return specifier.imported.name + ' as ' + specifier.local.name;
                  }
                });
                const source = node.source.value;

                return fixer.replaceText(node,
                  'import type {' + imports.join(', ') + '} from \'' + source + '\';'
                );
              },
              message: 'Unexpected type import',
              node
            });
          }
        }
      }
    };
  } else {
    // Default to 'identifier'
    return {
      ImportDeclaration (node) {
        if (node.importKind === 'type') {
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
      }
    };
  }
};

export default {
  create,
  schema
};
