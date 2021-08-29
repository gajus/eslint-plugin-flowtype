import { RuleTester } from 'eslint';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import useFlowType from '../../../src/rules/useFlowType';

const noUnusedVarsRule = builtinRules.get('no-unused-vars');

const VALID_WITH_USE_FLOW_TYPE = [
  {
    code: 'declare class A {}',
    errors: [
      '\'A\' is defined but never used.',
    ],
  },
  {
    code: 'declare function A(): Y',
    errors: [
      '\'A\' is defined but never used.',
    ],
  },
  {
    code: 'declare module A {}',
    errors: [
      '\'A\' is defined but never used.',
    ],
  },
  {
    code: 'declare module A { declare var a: Y }',
    errors: [
      '\'A\' is defined but never used.',
    ],
  },
  {
    code: 'declare var A: Y',
    errors: [
      '\'A\' is defined but never used.',
    ],
  },
  {
    code: 'import type A from "a"; type X<B = ComponentType<A>> = { b: B }; let x: X; console.log(x);',
    errors: [
      '\'A\' is defined but never used.',
    ],
  },
  {
    code: 'import type A from "a"; type X<B = A<string>> = { b: B }; let x: X; console.log(x);',
    errors: [
      '\'A\' is defined but never used.',
    ],
  },
];

const ALWAYS_INVALID = [
  {
    code: 'type A = Y',
    errors: [
      '\'A\' is defined but never used.',
    ],
  },
  {
    code: 'function x<A>() {}; x()',
    errors: [
      '\'A\' is defined but never used.',
    ],
  },
  {
    code: 'import type A from "a";',
    errors: [
      '\'A\' is defined but never used.',
    ],
  },
];

const ALWAYS_VALID = [
  'type A = Y; var x: A; x()',
  'var x: A; type A = Y; x()',
  'type A = Y; function x(a: A) { a() }; x()',
  'function x(a: A) { a() }; type A = Y; x()',
  'type A = Y; (x: A)',
  '(x: A); type A = Y',
  'function x<A>(): A {}; x()',
  'import type A from "a"; (function(): A {})',
  '(function(): A {}); import type A from "a";',
  'declare interface A {}',
  'declare type A = {}',
];

/**
 * This rule is tested differently than the rest because `RuleTester` is
 * designed to test rule reporting and use-flow-type doesn't report
 * anything. use-flow-type suppresses reports from no-unused-vars. So we're
 * actually testing no-unused-vars's reporting with use-flow-type enabled.
 */
{
  const ruleTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser'),
  });

  ruleTester.run('no-unused-vars must not trigger an error in these cases', noUnusedVarsRule, {
    invalid: [],
    valid: ALWAYS_VALID,
  });
}

{
  const ruleTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser'),
  });

  ruleTester.run('no-unused-vars must trigger an error in these cases', noUnusedVarsRule, {
    invalid: [
      ...ALWAYS_INVALID,
      ...VALID_WITH_USE_FLOW_TYPE,
    ],
    valid: [],
  });
}

{
  const ruleTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser'),
    rules: {
      'use-flow-type': 1,
    },
  });

  ruleTester.defineRule('use-flow-type', useFlowType);
  ruleTester.run('use-flow-type must not affect no-unused-vars behavior in these cases', noUnusedVarsRule, {
    invalid: ALWAYS_INVALID,
    valid: ALWAYS_VALID,
  });
}

export default {
  invalid: [],
  valid: [
    ...VALID_WITH_USE_FLOW_TYPE.map((subject) => {
      return {
        code: subject.code,
        rules: {
          'no-unused-vars': 1,
        },
      };
    }),
  ],
};
