import _ from 'lodash';
import {
    RuleTester
} from 'eslint';
import plugin from './../../src';

const ruleTester = new RuleTester();

const reportingRules = [
  'define-flow-type',
  'generic-spacing',
  'require-parameter-type',
  'require-return-type',
  'require-valid-file-annotation',
  'space-after-type-colon',
  'space-before-type-colon',
  'space-before-generic-bracket',
  'union-intersection-spacing',
  'type-id-match',
  'use-flow-type',
  'valid-syntax'
];

const parser = require.resolve('babel-eslint');

for (const ruleName of reportingRules) {
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
