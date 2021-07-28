const schema = [
  {
    type: 'string',
  },
];

const message = (suppression = '$FlowFixMe') => {
  return `${suppression} is missing a suppression code`;
};

const create = (context) => {
  const isMissingSuppressionCode = function (value) {
    if (value.startsWith('$FlowFixMe') &&
        !value.startsWith('$FlowFixMe[') &&
        !value.endsWith(']')) {
      return '$FlowFixMe';
    }
    if (value.startsWith('$FlowExpectedError') &&
        !value.startsWith('$FlowExpectedError[') &&
        !value.endsWith(']')) {
      return '$FlowExpectedError';
    }

    return undefined;
  };

  const handleComment = function (comment) {
    const value = comment.value.trim().split(' ').filter((arg) => {
      return arg.length > 0;
    })[0];
    const failedType = isMissingSuppressionCode(value);

    if (failedType) {
      context.report(comment, message(failedType));
    }
  };

  return {
    Program () {
      context
        .getSourceCode()
        .getAllComments()
        .filter((comment) => {
          return comment.type === 'Block' || comment.type === 'Line';
        })
        .forEach(handleComment);
    },
  };
};

export default {
  create,
  schema,
};
