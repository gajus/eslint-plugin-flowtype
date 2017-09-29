import makeArrayStyleRule from './arrayStyle';

const shorthandHandler = (isSimpleType, verbose, context, node) => {
  if (!isSimpleType && verbose) {
    context.report({
      message: 'Use "Array<ComplexType>", not "ComplexType[]"',
      node
    });
  }
};

const verboseHandler = (isSimpleType, verbose, context, node) => {
  if (!isSimpleType && !verbose) {
    context.report({
      message: 'Use "ComplexType[]", not "Array<ComplexType>"',
      node
    });
  }
};

export default makeArrayStyleRule('verbose', shorthandHandler, verboseHandler);
