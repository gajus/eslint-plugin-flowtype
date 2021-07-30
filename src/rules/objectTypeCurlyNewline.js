// import {spacingFixers} from '../utilities';

const schema = [
  {
    enum: ['always', 'never', 'multiline'],
    type: 'string',
  },
];

const meta = {
  fixable: 'code',
};

// const sameLine = (left, right) => {
//   return left.loc.end.line === right.loc.start.line;
// };

const create = (context) => {
  const option = context?.options[0] ?? 'multiline';

  return {
    ObjectTypeAnnotation (node) {
      const {
        properties,
      } = node;

      if (properties.length === 0) {
        return;
      }

      if (option === 'always' || option === 'multiline') {
        // If option is multiline act as never but if there are any multi lines
        // act as always
        if (option === 'multiline' && node.loc.start.line === node.loc.end.line) {
          return;
        }

        if (properties[0].loc.start.line === node.loc.start.line) {
          context.report({
            // fix: spacingFixers.stripSpacesAfter(opener, spacesBefore),
            message: 'There should be a newline after opening curly brace',
            node,
          });
        }

        if (properties[properties.length - 1].loc.end.line === node.loc.end.line) {
          context.report({
            // fix: spacingFixers.stripSpacesAfter(opener, spacesBefore),
            message: 'There should be a newline before closing curly brace',
            node,
          });
        }
      } else if (option === 'never') {
        if (properties[0].loc.start.line !== node.loc.start.line) {
          context.report({
            // fix: spacingFixers.stripSpacesAfter(opener, spacesBefore),
            message: 'There should not be a newline after opening curly brace',
            node,
          });
        }

        if (properties[properties.length - 1].loc.end.line !== node.loc.end.line) {
          context.report({
            // fix: spacingFixers.stripSpacesAfter(opener, spacesBefore),
            message: 'There should not be a newline before closing curly brace',
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
