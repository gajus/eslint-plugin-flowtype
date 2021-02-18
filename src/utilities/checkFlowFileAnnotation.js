import _ from 'lodash';
import isFlowFile from './isFlowFile';
import isNoFlowFile from './isNoFlowFile';

export default (cb, context) => {
  const checkThisFile = (!_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') && !isNoFlowFile(context)) || isFlowFile(context); // eslint-disable-line no-extra-parens, max-len

  if (!checkThisFile) {
    return () => {};
  }

  // eslint-disable-next-line promise/prefer-await-to-callbacks -- not a promise callback
  return cb(context);
};
