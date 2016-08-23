import _ from 'lodash';
import {
    isFlowFile,
    isFlowFileAnnotation
} from './../utilities';

const looksLikeFlowFileAnnotation = (comment) => {
  return /@(?:no)?flow/i.test(comment);
};

export const schema = [
  {
    enum: ['always']
  }
];

export default (context) => {
  const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

  if (!checkThisFile) {
    return {};
  }

  const always = context.options[0] === 'always';

  return {
    Program (node) {
      const firstToken = node.tokens[0];

      const potentialFlowFileAnnotation = _.find(context.getAllComments(), (comment) => {
        return looksLikeFlowFileAnnotation(comment.value);
      });

      if (potentialFlowFileAnnotation) {
        if (firstToken && firstToken.start < potentialFlowFileAnnotation.start) {
          context.report(potentialFlowFileAnnotation, 'Flow file annotation not at the top of the file.');
        }

        if (!isFlowFileAnnotation(potentialFlowFileAnnotation.value)) {
          context.report(potentialFlowFileAnnotation, 'Malformed flow file annotation.');
        }
      } else if (always) {
        context.report(node, 'Flow file annotation is missing.');
      }
    }
  };
};
