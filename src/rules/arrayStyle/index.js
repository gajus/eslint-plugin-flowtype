import isSimpleType from './isSimpleType';

const schema = [
  {
    enum: ['verbose', 'shorthand'],
    type: 'string'
  }
];

export default (defaultConfig, shorthandHandler, verboseHandler) => {
  const create = (context) => {
    const verbose = (context.options[0] || defaultConfig) === 'verbose';

    return {
      // shorthand
      ArrayTypeAnnotation (node) {
        shorthandHandler(isSimpleType(node.elementType), verbose, context, node);
      },
      // verbose
      GenericTypeAnnotation (node) {
        if (node.id.name === 'Array') {
          if (node.typeParameters.params.length === 1) {
            verboseHandler(isSimpleType(node.typeParameters.params[0]), verbose, context, node);
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
