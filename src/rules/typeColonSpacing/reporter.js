import {spacingFixers} from '../../utilities';

export default (direction, context, {always}) => {
  const check = ({node, spaces, token, name = '', type = 'type annotation'}) => {
    const data = {
      direction,
      name,
      type
    };

    if (always && spaces > 1) {
      context.report({
        data,
        fix: spacingFixers.stripSpacesAfter(token, spaces - 1),
        message: 'There must be 1 space {{direction}} {{name}}{{type}} colon.',
        node
      });
    } else if (always && spaces === 0) {
      context.report({
        data,
        fix: spacingFixers.addSpaceAfter(token),
        message: 'There must be a space {{direction}} {{name}}{{type}} colon.',
        node
      });
    } else if (!always && spaces > 0) {
      context.report({
        data,
        fix: spacingFixers.stripSpacesAfter(token, spaces),
        message: 'There must be no space {{direction}} {{name}}{{type}} colon.',
        node
      });
    }
  };

  return ({colon, ...rest}) => {
    const sourceCode = context.getSourceCode();
    const tokenBefore = sourceCode.getTokenBefore(colon);
    const tokenAfter = sourceCode.getTokenAfter(colon);
    let spaces, token;

    if (direction === 'before') {
      spaces = colon.start - tokenBefore.end;
      token = tokenBefore;
    } else {
      spaces = tokenAfter.start - colon.end;
      token = colon;
    }

    check({
      spaces,
      token,
      ...rest
    });
  };
};
