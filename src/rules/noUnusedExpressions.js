// A wrapper around ESLint's core rule no-unused-expressions, additionally ignores type cast
// expressions.

import coreNOE from 'eslint/lib/rules/no-unused-expressions';

const meta = coreNOE.meta;

const create = (context) => {
  const coreChecks = coreNOE.create(context);

  return {
    ExpressionStatement (node) {
      if (
        node.expression.type === 'TypeCastExpression' ||
        node.expression.type === 'OptionalCallExpression'
      ) {
        return;
      }
      coreChecks.ExpressionStatement(node);
    },
  };
};

export default {
  create,
  meta,
};
