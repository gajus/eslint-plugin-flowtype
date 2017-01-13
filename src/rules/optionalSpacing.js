import _ from 'lodash';
import {
  getParameterName
} from './../utilities';

const defaults = {
  after: false,
  before: false
};

export default (context) => {
  const sourceCode = context.getSourceCode();
  const after = _.get(context, ['options', '0', 'after'], defaults.after);
  const before = _.get(context, ['options', '0', 'before'], defaults.before);

  const reporter = (node, data) => {
    context.report({
      data,
      message: '{{error}} whitespace {{direction}} optional type annotation.',
      node
    });
  };

  const checkNode = (node) => {
    const optional = _.get(node, ['optional'], false);

    if (!optional) {
      return;
    }

    const parameterName = getParameterName(node, context);
    const propText = sourceCode.getText(node);

    const keyText = propText.slice(0, propText.indexOf(':'));
    const optionalIndex = keyText.indexOf('?');

    const spaceBefore = optionalIndex - parameterName.length;
    const spaceAfter = keyText.length - (optionalIndex + 1);

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
    Identifier: checkNode,
    ObjectTypeProperty: checkNode
  };
};
