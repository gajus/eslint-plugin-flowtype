import _ from 'lodash';

export default (comment) => {
    // The flow parser splits comments with the following regex to look for the @flow flag.
    // See https://github.com/facebook/flow/blob/a96249b93541f2f7bfebd8d62085bf7a75de02f2/src/parsing/docblock.ml#L39
    return _.includes(comment.split(/[ \t\r\n\\*/]+/), '@flow');
};

