import isSimpleType from './isSimpleType';
import needWrap from './needWrap';

const schema = [
  {
    enum: ['verbose', 'shorthand'],
    type: 'string'
  }
];

const fixShorthand = (node, type) => {
  return (fixer) => {
    return fixer.replaceText(node, 'Array<' + type + '>');
  };
};

const fixVerbose = (node, type, elementTypeNode) => {
  return (fixer) => {
    if (needWrap(elementTypeNode)) {
      return fixer.replaceText(node, '(' + type + ')[]');
    } else {
      return fixer.replaceText(node, type + '[]');
    }
  };
};

const inlineType = (type) => {
  const inlined = type.replace(/\s+/g, ' ');

  if (inlined.length <= 50) {
    return inlined;
  } else {
    return 'Type';
  }
};

export default (defaultConfig, shorthandHandler, verboseHandler) => {
  const create = (context) => {
    const verbose = (context.options[0] || defaultConfig) === 'verbose';

    return {
      // shorthand
      ArrayTypeAnnotation (node) {
        const rawElementType = context.getSourceCode().getText(node.elementType);
        const inlinedType = inlineType(rawElementType);
        const wrappedInlinedType = needWrap(node.elementType) ? '(' + inlinedType + ')' : inlinedType;

        shorthandHandler(
          isSimpleType(node.elementType),
          verbose,
          context,
          node,
          fixShorthand(node, rawElementType),
          inlinedType,
          wrappedInlinedType
        );
      },
      // verbose
      GenericTypeAnnotation (node) {
        if (node.id.name === 'Array') {
          if (node.typeParameters.params.length === 1) {
            const elementTypeNode = node.typeParameters.params[0];
            const rawElementType = context.getSourceCode().getText(elementTypeNode);
            const inlinedType = inlineType(rawElementType);
            const wrappedInlinedType = needWrap(elementTypeNode) ? '(' + inlinedType + ')' : inlinedType;

            verboseHandler(
              isSimpleType(elementTypeNode),
              verbose,
              context,
              node,
              fixVerbose(node, rawElementType, elementTypeNode),
              inlinedType,
              wrappedInlinedType
            );
          }
        }
      }
    };
  };

  return {
    create,
    schema
  };
};
