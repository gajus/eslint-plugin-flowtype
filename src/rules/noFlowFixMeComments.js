const schema = [
  {
    type: 'string'
  }
];

const message = '$FlowFixMe is treated as `any` and should be fixed.';

const isIdentifier = function (node, name) {
  return node && node.type === 'Identifier' && node.name.match(name);
};

const create = (context) => {
  const allowedPattern = context.options[0] ? new RegExp(context.options[0]) : null;
  const extraMessage = allowedPattern ? ' Fix it or match `' + allowedPattern.toString() + '`.' : '';

  const passesExtraRegex = function (value) {
    if (!allowedPattern) {
      return false;
    }

    return value.match(allowedPattern);
  };

  const handleComment = function (comment) {
    const value = comment.value.trim();

    if (value.match(/\$FlowFixMe/) && !passesExtraRegex(value)) {
      context.report(comment, message + extraMessage);
    }
  };

  return {
    BlockComment: handleComment,
    GenericTypeAnnotation: (node) => {
      if (isIdentifier(node.id, /\$FlowFixMe/)) {
        context.report({
          message,
          node: node.id
        });
      }
    },
    LineComment: handleComment
  };
};

export default {
  create,
  schema
};
