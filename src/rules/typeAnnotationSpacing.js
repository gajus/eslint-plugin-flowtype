Object.defineProperty(exports, '__esModule', {
  value: true,
});

const utilities = require('../utilities');

const schema = [
  {
    enum: [
      'always',
      'never',
    ],
    type: 'string',
  },
];

const create = (context) => {
  const sourceCode = context.getSourceCode();
  const never = (context.options[0] || 'never') === 'never';
  return {
    TypeParameterInstantiation (node) {
      const callee = node.parent.callee;
      if (!callee) {
        return;
      }

      const isNullable = node.params[0].type === 'NullableTypeAnnotation';
      const [
        opener,
        firstInnerToken,
        secondInnerToken,
      ] = sourceCode.getFirstTokens(node, 3);
      const [
        lastInnerToken,
        closer,
      ] = sourceCode.getLastTokens(node, 2);

      const spacesBefore = firstInnerToken.range[0] - opener.range[1];
      const spaceBetweenNullToken = secondInnerToken.range[0] - firstInnerToken.range[1];
      const spacesAfter = closer.range[0] - lastInnerToken.range[1];

      if (never) {
        if (spacesBefore) {
          const whiteSpaceBefore = sourceCode.text[opener.range[1]];

          if (whiteSpaceBefore !== '\n' && whiteSpaceBefore !== '\r') {
            context.report({
              fix: utilities.spacingFixers.stripSpacesAfter(opener, spacesBefore),
              message: 'There must be no space at start of type annotations',
              node,
            });
          }
        }

        if (isNullable && spaceBetweenNullToken) {
          // const whiteSpaceBefore = sourceCode.text[firstInnerToken.range[1]];
          context.report({
            fix: utilities.spacingFixers.stripSpacesAfter(firstInnerToken, spaceBetweenNullToken),
            message: 'There must be no space at start of type annotations',
            node,
          });
        }

        if (spacesAfter) {
          const whiteSpaceAfter = sourceCode.text[closer.range[0] - 1];

          if (whiteSpaceAfter !== '\n' && whiteSpaceAfter !== '\r') {
            context.report({
              data: {},
              fix: utilities.spacingFixers.stripSpacesAfter(lastInnerToken, spacesAfter),
              message: 'There must be no space at end of type annotations',
              node,
            });
          }
        }
      } else {
        if (spacesBefore > 1) {
          context.report({
            data: {},
            fix: utilities.spacingFixers.stripSpacesAfter(opener, spacesBefore - 1),
            message: 'There must be one space at start of type annotations',
            node,
          });
        } else if (spacesBefore === 0) {
          context.report({
            data: {},
            fix: utilities.spacingFixers.addSpaceAfter(opener),
            message: 'There must be a space at start of type annotations',
            node,
          });
        }

        if (spacesAfter > 1) {
          context.report({
            data: {},
            fix: utilities.spacingFixers.stripSpacesAfter(lastInnerToken, spacesAfter - 1),
            message: 'There must be one space at end of type annotations',
            node,
          });
        } else if (spacesAfter === 0) {
          context.report({
            data: {},
            fix: utilities.spacingFixers.addSpaceAfter(lastInnerToken),
            message: 'There must be a space at end of type annotations',
            node,
          });
        }
      }
    },
  };
};

const meta = {
  fixable: 'whitespace',
};
exports.default = {
  create,
  meta,
  schema,
};
module.exports = exports.default;
