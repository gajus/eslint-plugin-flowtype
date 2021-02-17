import {spacingFixers} from '../utilities';

const schema = [
  {
    enum: ['always', 'never'],
    type: 'string',
  },
];

const create = (context) => {
  const never = (context.options[0] || 'never') === 'never';

  return {
    GenericTypeAnnotation (node) {
      const types = node.typeParameters;

      // Promise<foo>
      // ^^^^^^^^^^^^ GenericTypeAnnotation (with typeParameters)
      //         ^^^  GenericTypeAnnotation (without typeParameters)
      if (!types) {
        return;
      }

      const spaceBefore = types.range[0] - node.id.range[1];

      if (never && spaceBefore) {
        context.report({
          data: {name: node.id.name},
          fix: spacingFixers.stripSpacesAfter(node.id, spaceBefore),
          message: 'There must be no space before "{{name}}" generic type annotation bracket',
          node,
        });
      }

      if (!never && !spaceBefore) {
        context.report({
          data: {name: node.id.name},
          fix: spacingFixers.addSpaceAfter(node.id),
          message: 'There must be a space before "{{name}}" generic type annotation bracket',
          node,
        });
      }

      if (!never && spaceBefore > 1) {
        context.report({
          data: {name: node.id.name},
          fix: spacingFixers.stripSpacesAfter(node.id, spaceBefore - 1),
          message: 'There must be one space before "{{name}}" generic type annotation bracket',
          node,
        });
      }
    },
  };
};

const meta = {
  fixable: 'whitespace',
};

export default {
  create,
  meta,
  schema,
};
