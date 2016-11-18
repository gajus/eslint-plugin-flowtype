import _ from 'lodash';
import {
    isFlowFileAnnotation
} from './../utilities';

const defaults = {
  annotationStyle: 'none'
};

const looksLikeFlowFileAnnotation = (comment) => {
  return /@(?:no)?flow/i.test(comment);
};

const isValidAnnotationStyle = (node, style) => {
  if (style === 'none') {
    return true;
  }

  return style === node.type.toLowerCase();
};

export const schema = [
  {
    enum: ['always']
  }
];

export default (context) => {
  const always = context.options[0] === 'always';
  const style = _.get(context, 'options[1].annotationStyle', defaults.annotationStyle);

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

        if (!isValidAnnotationStyle(potentialFlowFileAnnotation, style)) {
          const str = style === 'line' ? '`// @flow`' : '`/* @flow */`';

          context.report(potentialFlowFileAnnotation, 'Flow file annotation style must be ' + str);
        }
      } else if (always) {
        context.report(node, 'Flow file annotation is missing.');
      }
    }
  };
};
