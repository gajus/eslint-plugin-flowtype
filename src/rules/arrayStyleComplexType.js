import makeArrayStyleRule from './arrayStyle';

const shorthandHandler = (isSimpleType, verbose, context, node, fix, inlinedType, wrappedInlinedType) => {
  if (!isSimpleType && verbose) {
    context.report({
      data: {
        type: inlinedType,
        wrappedType: wrappedInlinedType
      },
      fix,
      message: 'Use "Array<{{ type }}>", not "{{ wrappedType }}[]"',
      node
    });
  }
};

const verboseHandler = (isSimpleType, verbose, context, node, fix, inlinedType, wrappedInlinedType) => {
  if (!isSimpleType && !verbose) {
    context.report({
      data: {
        type: inlinedType,
        wrappedType: wrappedInlinedType
      },
      fix,
      message: 'Use "{{ wrappedType }}[]", not "Array<{{ type }}>"',
      node
    });
  }
};

export default makeArrayStyleRule('verbose', shorthandHandler, verboseHandler);
