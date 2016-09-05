import _ from 'lodash';

const reportWeakType = (context, weakType) => {
  return (node) => {
    context.report({
      data: {weakType},
      message: 'Unexpected use of weak type "{{weakType}}"',
      node
    });
  };
};

const genericTypeEvaluator = (context) => {
  const weakTypes = ['Function', 'Object'];

  return (node) => {
    const name = _.get(node, 'id.name');
    const isWeakType = weakTypes.indexOf(name) >= 0;

    if (isWeakType) {
      reportWeakType(context, name)(node);
    }
  };
};

export default (context) => {
  return {
    AnyTypeAnnotation: reportWeakType(context, 'any'),
    GenericTypeAnnotation: genericTypeEvaluator(context)
  };
};
