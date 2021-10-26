// A wrapper around ESLint's core rule no-unused-expressions, additionally ignores type cast
// expressions.

import {
  getBuiltinRule,
} from '../utilities/getBuiltinRule';

const noUnusedExpressionsRule = getBuiltinRule('no-unused-expressions');

const {meta} = noUnusedExpressionsRule;

const create = (context) => {
  const coreChecks = noUnusedExpressionsRule.create(context);

  return {
    ExpressionStatement (node) {
      if (
        node.expression.type === 'TypeCastExpression' ||
        node.expression.type === 'OptionalCallExpression'
      ) {
        return;
      }

      // eslint-disable-next-line @babel/new-cap
      coreChecks.ExpressionStatement(node);
    },
  };
};

export default {
  create,
  meta,
};
