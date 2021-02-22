import {spacingFixers} from '../utilities';

const schema = [
  {
    enum: ['always', 'never'],
    type: 'string',
  },
];

const meta = {
  fixable: 'code',
};

const create = (context) => {
  const never = (context?.options[0] ?? 'never') === 'never';
  const sourceCode = context.getSourceCode();

  return {
    ObjectTypeAnnotation (node) {
      const {
        properties,
      } = node;

      if (properties.length === 0) {
        return;
      }

      const [opener, firstInnerToken] = sourceCode.getFirstTokens(node, 2);
      const [lastInnerToken, closer] = sourceCode.getLastTokens(node, 2);

      const spacesBefore = firstInnerToken.range[0] - opener.range[1];
      const spacesAfter = closer.range[0] - lastInnerToken.range[1];

      if (never) {
        if (spacesBefore) {
          if (sourceCode.text[opener?.range[1]] !== '\n') {
            context.report({
              data: {
                token: opener.value,
              },
              fix: spacingFixers.stripSpacesAfter(opener, spacesBefore),
              message: 'There should be no space after "{{token}}".',
              node,
            });
          }
        }
        if (spacesAfter) {
          if (sourceCode.text[closer?.range[0] - 1] !== '\n') {
            context.report({
              data: {
                token: closer.value,
              },
              fix: spacingFixers.stripSpacesBefore(closer, spacesAfter),
              message: 'There should be no space before "{{token}}".',
              node,
            });
          }
        }
      } else {
        if (spacesBefore > 1) {
          context.report({
            data: {
              token: opener.value,
            },
            fix: spacingFixers.stripSpacesAfter(opener, spacesBefore - 1),
            message: 'Only one space is required after "{{token}}".',
            node,
          });
        } else if (spacesBefore === 0) {
          context.report({
            data: {
              token: opener.value,
            },
            fix: spacingFixers.addSpaceAfter(opener),
            message: 'A space is required after "{{token}}".',
            node,
          });
        }

        if (spacesAfter > 1) {
          context.report({
            data: {
              token: closer.value,
            },
            fix: spacingFixers.stripSpacesAfter(lastInnerToken, spacesAfter - 1),
            message: 'Only one space is required before "{{token}}".',
            node,
          });
        } else if (spacesAfter === 0) {
          context.report({
            data: {
              token: closer.value,
            },
            fix: spacingFixers.addSpaceAfter(lastInnerToken),
            message: 'A space is required before "{{token}}".',
            node,
          });
        }
      }
    },
  };
};

export default {
  create,
  meta,
  schema,
};
