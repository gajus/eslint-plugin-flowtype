import _ from 'lodash';

export default (context) => {
    const comments = context.getAllComments();

    if (!comments.length) {
        return false;
    }

    const firstComment = comments[0];

    return _.includes(firstComment.value, '@flow');
};
