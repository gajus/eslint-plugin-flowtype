import isSimpleType from './isSimpleType';
import needWrap from './needWrap';

const schema = [
  {
    enum: ['verbose', 'shorthand'],
    type: 'string'
  }
];

const fixShorthand = (context, node) => {
  return (fixer) => {
    const rawElementType = context.getSourceCode().getText(node.elementType);

    return fixer.replaceText(node, 'Array<' + rawElementType + '>');
  };
};

const fixVerbose = (context, node) => {
  return (fixer) => {
    const elementTypeNode = node.typeParameters.params[0];
    const rawElementType = context.getSourceCode().getText(elementTypeNode);

    if (needWrap(elementTypeNode)) {
      return fixer.replaceText(node, '(' + rawElementType + ')[]');
    } else {
      return fixer.replaceText(node, rawElementType + '[]');
    }
  };
};

export default (defaultConfig, shorthandHandler, verboseHandler) => {
  const create = (context) => {
    const verbose = (context.options[0] || defaultConfig) === 'verbose';

    return {
      // shorthand
      ArrayTypeAnnotation (node) {
        shorthandHandler(isSimpleType(node.elementType), verbose, context, node, fixShorthand(context, node));
      },
      // verbose
      GenericTypeAnnotation (node) {
        if (node.id.name === 'Array') {
          if (node.typeParameters.params.length === 1) {
            verboseHandler(isSimpleType(node.typeParameters.params[0]), verbose, context, node, fixVerbose(context, node));
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
