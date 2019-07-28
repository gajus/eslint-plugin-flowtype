import {spacingFixers} from '../../utilities';

const hasLineBreak = (direction, colon, context) => {
  const sourceCode = context.getSourceCode();

  if (direction === 'before') {
    return colon.loc.start.line !== sourceCode.getTokenBefore(colon).loc.end.line;
  } else {
    return sourceCode.getTokenAfter(colon).loc.start.line !== colon.loc.end.line;
  }
};

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
    let lineBreak;
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

    if (hasLineBreak(direction, colon, context)) {
      if (allowLineBreak) {
        spaces = 1;
      } else {
        lineBreak = true;
        spaces = getSpaces(direction, colon, context);
      }
    } else {
      spaces = getSpaces(direction, colon, context);
    }

    if (always && lineBreak) {
      context.report({
        data,
        fix: spacingFixers.replaceWithSpace(direction, colon, spaces),
        message: 'There must not be a line break {{direction}} {{name}}{{type}} colon.',
        node
      });
    } else if (always && spaces > 1) {
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
