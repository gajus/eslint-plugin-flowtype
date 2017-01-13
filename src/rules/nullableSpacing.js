import _ from 'lodash';

const defaults = {
  after: false,
  before: true
};

export default (context) => {
  const sourceCode = context.getSourceCode();
  const after = _.get(context, ['options', '0', 'after'], defaults.after);
  const before = _.get(context, ['options', '0', 'before'], defaults.before);

  const reporter = (node, data) => {
    context.report({
      data,
      message: '{{error}} whitespace {{direction}} nullable type annotation.',
      node
    });
  };

  const checkNode = (node) => {
    const annotColon = sourceCode.getTokenBefore(node);
    const annotType = _.get(node, 'typeAnnotation');

    const spaceBefore = node.start - annotColon.end;
    const spaceAfter = annotType.start - node.start - 1;

    if (!after && spaceAfter !== 0 || after && spaceAfter > 1) {
      reporter(node, {
        direction: 'after',
        error: 'Unexpected'
      });
    }

    if (!before && spaceBefore !== 0 || before && spaceBefore > 1) {
      reporter(node, {
        direction: 'before',
        error: 'Unexpected'
      });
    }
  };

  return {
    NullableTypeAnnotation: checkNode
  };
};
