import {spacingFixers} from '../../utilities';

const getSpaces = (direction, colon, context) => {
  const sourceCode = context.getSourceCode();

  if (direction === 'before') {
    return colon.start - sourceCode.getTokenBefore(colon).end;
  } else {
    return sourceCode.getTokenAfter(colon).start - colon.end;
  }
};

export default (direction, context, {always, allowLineBreak}) => {
  return ({colon, node, name = '', type = 'type annotation'}) => {
    let spaces;

    // Support optional names
    // type X = { [string]: a }
    // type X = string => string
    if (!colon || colon.value !== ':') {
      return;
    }

    const data = {
      direction,
      name,
      type
    };

    const charAfter = context.getSourceCode().getText(colon, 0, 1).slice(1);

    if (allowLineBreak && RegExp(/(\n|\r)+/).test(charAfter)) {
      spaces = 1;
    } else {
      spaces = getSpaces(direction, colon, context);
    }

    if (always && spaces > 1) {
      context.report({
        data,
        fix: spacingFixers.stripSpaces(direction, colon, spaces - 1),
        message: 'There must be 1 space {{direction}} {{name}}{{type}} colon.',
        node
      });
    } else if (always && spaces === 0) {
      context.report({
        data,
        fix: spacingFixers.addSpace(direction, colon),
        message: 'There must be a space {{direction}} {{name}}{{type}} colon.',
        node
      });
    } else if (!always && spaces > 0) {
      context.report({
        data,
        fix: spacingFixers.stripSpaces(direction, colon, spaces),
        message: 'There must be no space {{direction}} {{name}}{{type}} colon.',
        node
      });
    }
  };
};
