/**
 * This rule is tested differently than the rest because `RuleTester` is
 * designed to test rule reporting and use-flow-type doesn't report
 * anything. use-flow-type suppresses reports from no-unused-vars. So we're
 * actually testing no-unused-vars's reporting with use-flow-type enabled.
 */

import {
    RuleTester
} from 'eslint';
import noUnusedVarsRule from 'eslint/lib/rules/no-unused-vars';
import useFlowType from '../../../src/rules/useFlowType';

RuleTester.prototype.defineRule('use-flow-type', useFlowType);

const VALID_WITH_USE_FLOW_TYPE = [
    {
        code: 'declare class A {}',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'declare function A(): Y',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'declare module A {}',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'declare module A { declare var a: Y }',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'declare var A: Y',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'import type A from "a"; (function<T: A>(): T {})',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: '(function<T: A>(): T {}); import type A from "a"',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'import type {A} from "a"; (function<T: A>(): T {})',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: '(function<T: A>(): T {}); import type {A} from "a"',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: '(function<T: A>(): T {}); import type {a as A} from "a"',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'type A = {}; function x<Y: A>(i: Y) { i }; x()',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'function x<Y: A>(i: Y) { i }; type A = {}; x()',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'type A = {}; function x<Y: A.B.C>(i: Y) { i }; x()',
        // QualifiedTypeIdentifier -------^
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'function x<Y: A.B.C>(i: Y) { i }; type A = {}; x()',
        //                   ^- QualifiedTypeIdentifier
        errors: [
            '\'A\' is defined but never used'
        ]
    }
];

const ALWAYS_INVALID = [
    {
        code: 'type A = Y',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'function x<A>() {}; x()',
        errors: [
            '\'A\' is defined but never used'
        ]
    },
    {
        code: 'import type A from "a";',
        errors: [
            '\'A\' is defined but never used'
        ]
    }
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
    'declare type A = {}'
];

// Test that no-unused-vars errors actually occur without use-flow-type.
new RuleTester({
    parser: 'babel-eslint'
}).run('no-unused-vars', noUnusedVarsRule, {
    invalid: [].concat(
        ALWAYS_INVALID,
        VALID_WITH_USE_FLOW_TYPE
    ),
    valid: ALWAYS_VALID
});

// Test that no-unused-vars no longer reports flow declaration "never used" errors.
new RuleTester({
    parser: 'babel-eslint',
    rules: {'use-flow-type': 1}
}).run('no-unused-vars', noUnusedVarsRule, {
    invalid: ALWAYS_INVALID,
    valid: [].concat(
        ALWAYS_VALID,
        VALID_WITH_USE_FLOW_TYPE.map((item) => { return item.code; })
    )
});

