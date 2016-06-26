import _ from 'lodash';
import {
    RuleTester
} from 'eslint';
import plugin from './../../src';

const ruleTester = new RuleTester();

const rules = [
    'require-parameter-type',
    'require-return-type',
    'require-valid-file-annotation',
    'space-after-type-colon',
    'space-before-type-colon',
    'type-id-match'
];

const parser = require.resolve('babel-eslint');

for (const ruleName of rules) {
    /* eslint-disable global-require */
    const assertions = require('./assertions/' + _.camelCase(ruleName));
    /* eslint-enable global-require */

    assertions.invalid = _.map(assertions.invalid, (assertion) => {
        assertion.parser = parser;

        return assertion;
    });

    assertions.valid = _.map(assertions.valid, (assertion) => {
        assertion.parser = parser;

        return assertion;
    });

    ruleTester.run(ruleName, plugin.rules[ruleName], assertions);
}
