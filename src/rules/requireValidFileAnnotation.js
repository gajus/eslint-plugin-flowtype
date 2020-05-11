import _ from 'lodash';
import {
  isFlowFileAnnotation,
  fuzzyStringMatch,
} from '../utilities';

const defaults = {
  annotationStyle: 'none',
  strict: false,
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
  return /@[a-z]+\b/.test(comment) && fuzzyStringMatch(comment.replace(/no/i, ''), '@flow', 0.2);
};

const isFlowStrict = (comment) => {
  return /^@flow\sstrict\b/.test(comment);
};

const noFlowAnnotation = (comment) => {
  return /^@noflow\b/.test(comment);
};

const schema = [
  {
    enum: ['always', 'never'],
    type: 'string',
  },
  {
    additionalProperties: false,
    properties: {
      annotationStyle: {
        enum: ['none', 'line', 'block'],
        type: 'string',
      },
      strict: {
        enum: [true, false],
        type: 'boolean',
      },
    },
    type: 'object',
  },
];

const create = (context) => {
  const always = context.options[0] === 'always';
  const style = _.get(context, 'options[1].annotationStyle', defaults.annotationStyle);
  const flowStrict = _.get(context, 'options[1].strict', defaults.strict);

  return {
    Program (node) {
      const firstToken = node.tokens[0];
      const addAnnotation = () => {
        return (fixer) => {
          let annotation;
          if (flowStrict) {
            annotation = ['line', 'none'].includes(style) ? '// @flow strict\n' : '/* @flow strict */\n';
          } else {
            annotation = ['line', 'none'].includes(style) ? '// @flow\n' : '/* @flow */\n';
          }

          return fixer.replaceTextRange([node.range[0], node.range[0]], annotation);
        };
      };

      const addStrictAnnotation = () => {
        return (fixer) => {
          const annotation = ['line', 'none'].includes(style) ? '// @flow strict\n' : '/* @flow strict */\n';

          return fixer.replaceTextRange([node.range[0], node.range[0]], annotation);
        };
      };

      const potentialFlowFileAnnotation = _.find(context.getAllComments(), (comment) => {
        return looksLikeFlowFileAnnotation(comment.value);
      });

      if (potentialFlowFileAnnotation) {
        if (firstToken && firstToken.range[0] < potentialFlowFileAnnotation.range[0]) {
          context.report(potentialFlowFileAnnotation, 'Flow file annotation not at the top of the file.');
        }
        const annotationValue = potentialFlowFileAnnotation.value.trim();
        if (isFlowFileAnnotation(annotationValue)) {
          if (!isValidAnnotationStyle(potentialFlowFileAnnotation, style)) {
            const annotation = style === 'line' ? '// ' + annotationValue : '/* ' + annotationValue + ' */';

            context.report({
              fix: (fixer) => {
                return fixer.replaceTextRange(
                  [potentialFlowFileAnnotation.range[0], potentialFlowFileAnnotation.range[1]],
                  annotation
                );
              },
              message: 'Flow file annotation style must be `' + annotation + '`',
              node: potentialFlowFileAnnotation,
            });
          }
          if (!noFlowAnnotation(annotationValue) && flowStrict) {
            if (!isFlowStrict(annotationValue)) {
              const str = style === 'line' ? '`// @flow strict`' : '`/* @flow strict */`';
              context.report({
                fix: addStrictAnnotation(),
                message: 'Strict Flow file annotation is required, should be ' + str,
                node,
              });
            }
          }
        } else if (checkAnnotationSpelling(annotationValue)) {
          context.report(potentialFlowFileAnnotation, 'Misspelled or malformed Flow file annotation.');
        } else {
          context.report(potentialFlowFileAnnotation, 'Malformed Flow file annotation.');
        }
      } else if (always) {
        context.report({
          fix: addAnnotation(),
          message: 'Flow file annotation is missing.',
          node,
        });
      }
    },
  };
};

export default {
  create,
  schema,
};
