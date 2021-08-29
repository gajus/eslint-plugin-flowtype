// A wrapper around ESLint's core rule no-unused-expressions, additionally ignores type cast
// expressions.
import { builtinRules } from 'eslint/use-at-your-own-risk';

const coreNOE = builtinRules.get('no-unused-expressions');

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
