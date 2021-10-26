import _ from 'lodash';

const FLOW_MATCHER = /^@(?:no)?flow$/u;

export default (comment, strict) => {
  // The flow parser splits comments with the following regex to look for the @flow flag.
  // See https://github.com/facebook/flow/blob/a96249b93541f2f7bfebd8d62085bf7a75de02f2/src/parsing/docblock.ml#L39
  return _.some(comment.split(/[\t\n\r */\\]+/u), (commentPart) => {
    const match = commentPart.match(FLOW_MATCHER);

    if (match === null) {
      return false;
    }

    return !strict || match[0] === '@flow';
  });
};
