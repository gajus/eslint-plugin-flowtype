import {
    RuleTester
} from 'eslint';
import noUndefRule from 'eslint/lib/rules/no-undef';

const VALID_WITH_DEFINE_FLOW_TYPE = [
  {
    code: 'var a: AType',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'var a: AType; var b: AType',
    errors: [
      '\'AType\' is not defined.',
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'var a; (a: AType)',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'var a: AType<BType>',
    errors: [
      '\'AType\' is not defined.',
      '\'BType\' is not defined.'
    ]
  },
  {
    code: 'type A = AType',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'declare type A = number',
    errors: [
      '\'A\' is not defined.'
    ]
  },
  {
    code: 'opaque type A = AType',
    errors: [
      // Complaining about 'A' not being defined might be an upstream bug
      '\'A\' is not defined.',
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'function f(a: AType) {}',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'function f(a: AType.a) {}',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'function f(a: AType.a.b) {}',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'function f(a): AType {}; var a: AType',
    errors: [
      '\'AType\' is not defined.',
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'function f(a): AType {}',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'class C { a: AType }',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'class C { a: AType.a }',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'class C { a: AType.a.b }',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'class C implements AType {}',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'interface AType {}',
    errors: [
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'declare interface A {}',
    errors: [
      '\'A\' is not defined.'
    ]
  },
  {
    code: '({ a: ({b() {}}: AType) })',
        // `AType` appears twice in `globalScope.through` as distinct
        // references, this may be a babel-eslint bug.
    errors: [
      '\'AType\' is not defined.',
      '\'AType\' is not defined.'
    ]
  },
  {
    code: 'type X = {Y<AType>(): BType}',
    errors: [
      '\'AType\' is not defined.',
      '\'BType\' is not defined.'
    ]
  },
  {
    code: 'interface AType<BType> {}',
    errors: [
      '\'AType\' is not defined.',
      '\'BType\' is not defined.'
    ]
  }
];

const ALWAYS_INVALID = [
  {
    code: 'var a = b',
    errors: [
      '\'b\' is not defined.'
    ]
  },
  {
    code: 'function f(a = b) {}',
    errors: [
      '\'b\' is not defined.'
    ]
  },
  {
    code: 'class C extends b {}',
    errors: [
      '\'b\' is not defined.'
    ]
  },
  {
    code: 'class C { static S = b }',
    errors: [
      '\'b\' is not defined.'
    ]
  }
];

const ALWAYS_VALID = [
  'var a: string',
  'var a: Array',
  'var a: Array<string>',
  'type A = Array',
  // This complains about 'A' not being defined. It might be an upstream bug
  // 'opaque type A = Array',
  'function f(a: string) {}',
  'function f(a): string {}',
  'class C { a: string }',
  'var AType = {}; class C { a: AType.a }',
  'declare module A { declare var a: AType }'
];

/**
 * This rule is tested differently than the rest because `RuleTester` is
 * designed to test rule reporting and define-flow-type doesn't report
 * anything. define-flow-type suppresses reports from no-undef. So we're
 * actually testing no-undef's reporting with define-flow-type enabled.
 */
{
  const ruleTester = new RuleTester({
    parser: 'babel-eslint'
  });

  ruleTester.run('no-under must not trigger an error in these cases', noUndefRule, {
    invalid: [],
    valid: ALWAYS_VALID
  });
}

{
  const ruleTester = new RuleTester({
    parser: 'babel-eslint'
  });

  ruleTester.run('no-undef must trigger an error when define-flow-type is not used in these cases', noUndefRule, {
    invalid: [
      ...ALWAYS_INVALID,
      ...VALID_WITH_DEFINE_FLOW_TYPE
    ],
    valid: []
  });
}

export default {
  invalid: [],
  valid: [
    ...VALID_WITH_DEFINE_FLOW_TYPE.map((subject) => {
      return {
        code: subject.code,
        rules: {
          'no-undef': 2
        }
      };
    }),
    ...VALID_WITH_DEFINE_FLOW_TYPE.map((subject) => {
      return {
        code: subject.code,
        rules: {
          'no-undef': 2,
          'no-use-before-define': [
            2,
            'nofunc'
          ]
        }
      };
    })
  ]
};
