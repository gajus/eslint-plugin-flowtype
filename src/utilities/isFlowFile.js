import isFlowFileAnnotation from './isFlowFileAnnotation.js';

export default (context) => {
  const comments = context.getAllComments();

  if (!comments.length) {
    return false;
  }

  const firstComment = comments[0];

  return isFlowFileAnnotation(firstComment.value);
};
