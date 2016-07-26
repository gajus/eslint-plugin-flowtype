/**
 * This rule is tested differently than the rest because `RuleTester` is
 * designed to test rule reporting and define-flow-type doesn't report
 * anything. define-flow-type suppresses reports from no-undef. So we're
 * actually testing no-undef's reporting with define-flow-type enabled.
 */

import {
    RuleTester
} from 'eslint';
import noUndefRule from 'eslint/lib/rules/no-undef';
import defineFlowType from '../../../src/rules/defineFlowType';

RuleTester.prototype.defineRule('define-flow-type', defineFlowType);

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
    'function f(a: string) {}',
    'function f(a): string {}',
    'class C { a: string }',
    'var AType = {}; class C { a: AType.a }',
    'declare module A { declare var a: AType }'
];

// Test that no-undef errors actually occur without define-flow-type.
new RuleTester({
    parser: 'babel-eslint'
}).run('no-undef', noUndefRule, {
    invalid: [].concat(
        ALWAYS_INVALID,
        VALID_WITH_DEFINE_FLOW_TYPE
    ),
    valid: ALWAYS_VALID
});

// Test that no-undef no longer reports "not defined" errors for flow types.
new RuleTester({
    parser: 'babel-eslint',
    rules: {'define-flow-type': 1}
}).run('no-undef', noUndefRule, {
    invalid: ALWAYS_INVALID,
    valid: [].concat(
        ALWAYS_VALID,
        VALID_WITH_DEFINE_FLOW_TYPE.map((item) => { return item.code; })
    )
});

// Test compatibility with no-use-before-define.
new RuleTester({
    parser: 'babel-eslint',
    rules: {
        'define-flow-type': 1,
        'no-use-before-define': [2, 'nofunc']
    }
}).run('no-undef', noUndefRule, {
    invalid: ALWAYS_INVALID,
    valid: [].concat(
        ALWAYS_VALID,
        VALID_WITH_DEFINE_FLOW_TYPE.map((item) => { return item.code; })
    )
});
