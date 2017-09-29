import makeArrayStyleRule from './arrayStyle';

const shorthandHandler = (isSimpleType, verbose, context, node, fix) => {
  if (isSimpleType && verbose) {
    context.report({
      fix,
      message: 'Use "Array<SimpleType>", not "SimpleType[]"',
      node
    });
  }
};

const verboseHandler = (isSimpleType, verbose, context, node, fix) => {
  if (isSimpleType && !verbose) {
    context.report({
      fix,
      message: 'Use "SimpleType[]", not "Array<SimpleType>"',
      node
    });
  }
};

export default makeArrayStyleRule('shorthand', shorthandHandler, verboseHandler);
