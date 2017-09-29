import makeArrayStyleRule from './arrayStyle';

const shorthandHandler = (isSimpleType, verbose, context, node) => {
  if (isSimpleType && verbose) {
    context.report({
      message: 'Use "Array<SimpleType>", not "SimpleType[]"',
      node
    });
  }
};

const verboseHandler = (isSimpleType, verbose, context, node) => {
  if (isSimpleType && !verbose) {
    context.report({
      message: 'Use "SimpleType[]", not "Array<SimpleType>"',
      node
    });
  }
};

export default makeArrayStyleRule('shorthand', shorthandHandler, verboseHandler);
