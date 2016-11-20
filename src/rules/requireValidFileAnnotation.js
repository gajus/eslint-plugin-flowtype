import _ from 'lodash';
import detectNewline from 'detect-newline';
import {
    isFlowFile,
    isFlowFileAnnotation
} from './../utilities';

const defaults = {
  annotationStyle: 'none'
};

const looksLikeFlowFileAnnotation = (comment) => {
  return /@(?:no)?flow/i.test(comment);
};

const getNewLine = (context) => {
  return detectNewline.graceful(context.getSourceCode().text);
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

const styleToFlowFileAnnotation = (style) => {
  return style === 'line' ? '// @flow' : '/* @flow */';
};

export default (context) => {
  const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

  if (!checkThisFile) {
    return {};
  }

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
          const str = ['`', styleToFlowFileAnnotation(style), '`'].join('');

          context.report(potentialFlowFileAnnotation, 'Flow file annotation style must be ' + str);
        }
      } else if (always) {
        context.report({
          fix (fixer) {
            const str = styleToFlowFileAnnotation(style);
            const newLine = getNewLine(context);

            return fixer.insertTextBefore(node, str + newLine);
          },
          message: 'Flow file annotation is missing.',
          node
        });
      }
    }
  };
};
