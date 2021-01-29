import {getParameterName} from '../utilities';

const schema = [
  {
    enum: ['always', 'never'],
    type: 'string',
  },
];

const create = (context) => {
  const always = (context.options[0] || 'always') === 'always';

  if (always) {
    return {
      ObjectTypeIndexer (node) {
        const id = getParameterName(node, context);
        const rawKeyType = context.getSourceCode().getText(node.key);
        if (id === null) {
          context.report({
            fix (fixer) {
              return fixer.replaceText(node.key, 'key: ' + rawKeyType);
            },
            message: 'All indexers must be declared with key name.',
            node,
          });
        }
      },
    };
  } else {
    return {};
  }
};

export default {
  create,
  meta: {
    fixable: 'code',
  },
  schema,
};
