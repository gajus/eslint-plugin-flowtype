import {spacingFixers, getTokenAfterParens} from '../utilities';

const schema = [
  {
    enum: ['always', 'never'],
    type: 'string',
  },
];

const create = (context) => {
  const sourceCode = context.getSourceCode();

  const always = (context.options[0] || 'always') === 'always';

  const check = (node) => {
    node.types.forEach((type, index) => {
      if (index + 1 === node.types.length) {
        return;
      }

      const separator = getTokenAfterParens(sourceCode, type);
      const endOfType = sourceCode.getTokenBefore(separator);
      const nextType = sourceCode.getTokenAfter(separator);

      const spaceBefore = separator.range[0] - endOfType.range[1];
      const spaceAfter = nextType.range[0] - separator.range[1];

      const data = {type: node.type === 'UnionTypeAnnotation' ? 'union' : 'intersection'};

      if (always) {
        if (!spaceBefore) {
          context.report({
            data,
            fix: spacingFixers.addSpaceAfter(endOfType),
            message: 'There must be a space before {{type}} type annotation separator',
            node,
          });
        }

        if (!spaceAfter) {
          context.report({
            data,
            fix: spacingFixers.addSpaceAfter(separator),
            message: 'There must be a space after {{type}} type annotation separator',
            node,
          });
        }
      } else {
        if (spaceBefore) {
          context.report({
            data,
            fix: spacingFixers.stripSpacesAfter(endOfType, spaceBefore),
            message: 'There must be no space before {{type}} type annotation separator',
            node,
          });
        }

        if (spaceAfter) {
          context.report({
            data,
            fix: spacingFixers.stripSpacesAfter(separator, spaceAfter),
            message: 'There must be no space after {{type}} type annotation separator',
            node,
          });
        }
      }
    });
  };

  return {
    IntersectionTypeAnnotation: check,
    UnionTypeAnnotation: check,
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
