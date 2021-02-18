import _ from 'lodash';

const schema = [];

// const x = [];
const isEmptyArrayLiteral = (node) => {
  return _.get(node, 'init.type') === 'ArrayExpression' && _.get(node, 'init.elements.length') === 0;
};

// const x = new Array(); const y = Array();
const isEmptyArrayInstance = (node) => {
  if (_.get(node, 'init.type') === 'NewExpression' || _.get(node, 'init.type') === 'CallExpression') {
    return _.get(node, 'init.callee.name') === 'Array' && _.get(node, 'init.arguments.length') === 0;
  } else {
    return false;
  }
};

const isAnnotationOfEmptyArrayInit = (node) => {
  if (_.has(node, 'parent.parent.parent')) {
    const parent = _.get(node, 'parent.parent.parent');
    const isVariableDeclaration = _.get(parent, 'type') === 'VariableDeclarator';

    return isVariableDeclaration && (isEmptyArrayLiteral(parent) || isEmptyArrayInstance(parent));
  } else {
    return false;
  }
};

const create = (context) => {
  return {
    ArrayTypeAnnotation (node) {
      if (!isAnnotationOfEmptyArrayInit(node)) {
        context.report({
          fix (fixer) {
            const rawElementType = context.getSourceCode().getText(node.elementType);

            return fixer.replaceText(node, '$ReadOnlyArray<' + rawElementType + '>');
          },
          message: 'Use "$ReadOnlyArray" instead of array shorthand notation',
          node,
        });
      }
    },
    GenericTypeAnnotation (node) {
      if (node.id.name === 'Array' && !isAnnotationOfEmptyArrayInit(node)) {
        context.report({
          fix (fixer) {
            return fixer.replaceText(node.id, '$ReadOnlyArray');
          },
          message: 'Use "$ReadOnlyArray" instead of "Array"',
          node,
        });
      }
    },
  };
};

export default {
  create,
  meta: {
    fixable: 'code',
  },
  schema,
};
