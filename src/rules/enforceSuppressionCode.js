const schema = [
  {
    type: 'string',
  },
];

const message = (suppression = '') => {
  return `${suppression} is missing a suppression code`;
};

const create = (context) => {
  const isMissingSuppressionCode = function (value) {
    const suppressionTypes = ['$FlowFixMe', '$FlowExpectedError'];

    let failedType;
    suppressionTypes.forEach((cur) => {
      if (value.startsWith(cur) &&
          !value.startsWith(`${cur}[`) &&
          !value.endsWith(']')) {
        failedType = cur;
      }
    });

    return failedType;
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
