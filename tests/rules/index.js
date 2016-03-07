import _ from 'lodash';

import {
    RuleTester
} from 'eslint';

import {
    rules
} from './../../src/';

const ruleTester = new RuleTester();

_.forEach([
    'require-parameter-type',
    'require-return-type',
    'space-after-type-colon',
    'space-before-type-colon'
], (ruleName) => {
    const parser = require.resolve('babel-eslint');

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

    ruleTester.run(ruleName, rules[ruleName], assertions);
});
