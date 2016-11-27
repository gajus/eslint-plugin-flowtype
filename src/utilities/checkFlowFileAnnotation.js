import _ from 'lodash';
import isFlowFile from './isFlowFile';

export default (cb, context) => {
  const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

  if (!checkThisFile) {
    return () => {};
  }

  return cb(context);
};
