import _ from 'lodash';

const looksLikeFlowFileAnnotation = (comment) => {
  return /@(?:no)?flo/i.test(comment);
};

const schema = [
  {
    enum: ['always', 'always-windows', 'never'],
    type: 'string'
  }
];

const create = (context) => {
  const mode = context.options[0];
  const never = mode === 'never';

  const newline = mode === 'always-windows' ? '\r\n' : '\n';

  return {
    Program (node) {
      const sourceCode = context.getSourceCode();

      const potentialFlowFileAnnotation = _.find(
        context.getAllComments(),
        (comment) => {
          return looksLikeFlowFileAnnotation(comment.value);
        }
      );

      if (potentialFlowFileAnnotation) {
        const line = potentialFlowFileAnnotation.loc.end.line;
        const nextLineIsEmpty = sourceCode.lines[line] === '';

        if (!never && !nextLineIsEmpty) {
          context.report({
            fix: (fixer) => {
              return fixer.insertTextAfter(
              potentialFlowFileAnnotation,
              newline
            );
            },
            message: 'Expected newline after flow annotation',
            node
          });
        }

        if (never && nextLineIsEmpty) {
          context.report({
            fix: (fixer) => {
              const lineBreak = sourceCode.text[potentialFlowFileAnnotation.end];

              return fixer.replaceTextRange(
                [
                  potentialFlowFileAnnotation.end,
                  potentialFlowFileAnnotation.end + (
                    lineBreak === '\r' ? 2 : 1
                  )
                ],
                ''
              );
            },
            message: 'Expected no newline after flow annotation',
            node
          });
        }
      }
    }
  };
};

export default {
  create,
  schema
};

