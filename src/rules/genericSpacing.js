import {spacingFixers} from '../utilities';

const schema = [
  {
    enum: ['always', 'never'],
    type: 'string'
  }
];

const create = (context) => {
  const sourceCode = context.getSourceCode();

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

      const [opener, firstInnerToken] = sourceCode.getFirstTokens(types, 2);
      const [lastInnerToken, closer] = sourceCode.getLastTokens(types, 2);

      const spacesBefore = firstInnerToken.start - opener.end;
      const spacesAfter = closer.start - lastInnerToken.end;

      if (never) {
        if (spacesBefore) {
          context.report({
            data: {name: node.id.name},
            fix: spacingFixers.stripSpacesAfter(opener, spacesBefore),
            message: 'There must be no space at start of "{{name}}" generic type annotation',
            node: types
          });
        }

        if (spacesAfter) {
          context.report({
            data: {name: node.id.name},
            fix: spacingFixers.stripSpacesAfter(lastInnerToken, spacesAfter),
            message: 'There must be no space at end of "{{name}}" generic type annotation',
            node: types
          });
        }
      } else {
        if (spacesBefore > 1) {
          context.report({
            data: {name: node.id.name},
            fix: spacingFixers.stripSpacesAfter(opener, spacesBefore - 1),
            message: 'There must be one space at start of "{{name}}" generic type annotation',
            node: types
          });
        } else if (spacesBefore === 0) {
          context.report({
            data: {name: node.id.name},
            fix: spacingFixers.addSpaceAfter(opener),
            message: 'There must be a space at start of "{{name}}" generic type annotation',
            node: types
          });
        }

        if (spacesAfter > 1) {
          context.report({
            data: {name: node.id.name},
            fix: spacingFixers.stripSpacesAfter(lastInnerToken, spacesAfter - 1),
            message: 'There must be one space at end of "{{name}}" generic type annotation',
            node: types
          });
        } else if (spacesAfter === 0) {
          context.report({
            data: {name: node.id.name},
            fix: spacingFixers.addSpaceAfter(lastInnerToken),
            message: 'There must be a space at end of "{{name}}" generic type annotation',
            node: types
          });
        }
      }
    }
  };
};

export default {
  create,
  schema
};
