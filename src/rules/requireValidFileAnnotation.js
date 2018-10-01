import _ from 'lodash';
import {
  isFlowFileAnnotation,
  fuzzyStringMatch
} from '../utilities';

const defaults = {
  annotationStyle: 'none'
};

const looksLikeFlowFileAnnotation = (comment) => {
  return /@(?:no)?flo/i.test(comment);
};

const isValidAnnotationStyle = (node, style) => {
  if (style === 'none') {
    return true;
  }

  return style === node.type.toLowerCase();
};

const checkAnnotationSpelling = (comment) => {
  return /@[a-z]+\b/.test(comment) && fuzzyStringMatch(comment.replace(/no/i, ''), '@flow', 0.20);
};

const schema = [
  {
    enum: ['always', 'never'],
    type: 'string'
  },
  {
    additionalProperties: false,
    properties: {
      annotationStyle: {
        enum: ['none', 'line', 'block'],
        type: 'string'
      }
    },
    type: 'object'
  }
];

const create = (context) => {
  const always = context.options[0] === 'always';
  const style = _.get(context, 'options[1].annotationStyle', defaults.annotationStyle);

  return {
    Program (node) {
      const firstToken = node.tokens[0];

      const addAnnotation = () => {
        return (fixer) => {
          const annotation = ['line', 'none'].includes(style) ? '// @flow\n' : '/* @flow */\n';

          return fixer.replaceTextRange([node.start, node.start], annotation);
        };
      };

      const potentialFlowFileAnnotation = _.find(context.getAllComments(), (comment) => {
        return looksLikeFlowFileAnnotation(comment.value);
      });

      if (potentialFlowFileAnnotation) {
        if (firstToken && firstToken.start < potentialFlowFileAnnotation.start) {
          context.report(potentialFlowFileAnnotation, 'Flow file annotation not at the top of the file.');
        }

        if (isFlowFileAnnotation(potentialFlowFileAnnotation.value.trim())) {
          if (!isValidAnnotationStyle(potentialFlowFileAnnotation, style)) {
            const str = style === 'line' ? '`// ' + potentialFlowFileAnnotation.value.trim() + '`' : '`/* ' + potentialFlowFileAnnotation.value.trim() + ' */`';

            context.report(potentialFlowFileAnnotation, 'Flow file annotation style must be ' + str);
          }
        } else if (checkAnnotationSpelling(potentialFlowFileAnnotation.value.trim())) {
          context.report(potentialFlowFileAnnotation, 'Misspelled or malformed Flow file annotation.');
        } else {
          context.report(potentialFlowFileAnnotation, 'Malformed Flow file annotation.');
        }
      } else if (always) {
        context.report({
          fix: addAnnotation(),
          message: 'Flow file annotation is missing.',
          node
        });
      }
    }
  };
};

export default {
  create,
  schema
};
