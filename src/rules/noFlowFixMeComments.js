const schema = [
  {
    type: 'string',
  },
];

const message = '$FlowFixMe is treated as `any` and must be fixed.';

const isIdentifier = function (node, name) {
  return node && node.type === 'Identifier' && node.name.match(name);
};

const create = (context) => {
  const allowedPattern = context.options[0] ? new RegExp(context.options[0], 'u') : null;
  const extraMessage = allowedPattern ? ' Fix it or match `' + allowedPattern.toString() + '`.' : '';

  const passesExtraRegex = function (value) {
    if (!allowedPattern) {
      return false;
    }

    return value.match(allowedPattern);
  };

  const handleComment = function (comment) {
    const value = comment.value.trim();

    if (/\$FlowFixMe/u.test(value) && !passesExtraRegex(value)) {
      context.report(comment, message + extraMessage);
    }
  };

  return {
    GenericTypeAnnotation (node) {
      if (isIdentifier(node.id, /\$FlowFixMe/u)) {
        context.report({
          message,
          node: node.id,
        });
      }
    },

    Program () {
      for (const comment of context
        .getSourceCode()
        .getAllComments()
        .filter((node) => {
          return node.type === 'Block' || node.type === 'Line';
        })) {
        handleComment(comment);
      }
    },
  };
};

export default {
  create,
  schema,
};
