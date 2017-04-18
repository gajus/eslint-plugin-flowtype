import isFlowFileAnnotation from './isFlowFileAnnotation.js';
/* eslint-disable flowtype/require-valid-file-annotation */
/**
 * Checks whether a file has an @flow or @noflow annotation.
 * @param context
 * @param [strict] - By default, the function returns true if the file starts with @flow but not if it
 * starts by @noflow. When the strict flag is set to false, the function returns true if the flag has @noflow also.
 */
/* eslint-enable flowtype/require-valid-file-annotation */
export default (context, strict = true) => {
  const comments = context.getAllComments();

  if (!comments.length) {
    return false;
  }

  const firstComment = comments[0];

  return isFlowFileAnnotation(firstComment.value) && !(strict && /no/.test(firstComment.value));
};
