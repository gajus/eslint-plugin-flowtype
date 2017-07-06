import assert from 'assert';
import _ from 'lodash';
import {RuleTester} from 'eslint';
import validator from 'eslint/lib/config/config-validator';
import rules from 'eslint/lib/rules';
import validate from 'is-my-json-valid';
import plugin from './../../src';

rules.importPlugin(plugin, 'flowtype');

const ruleTester = new RuleTester();

const reportingRules = [
  'boolean-style',
  'define-flow-type',
  'delimiter-dangle',
  'generic-spacing',
  'no-dupe-keys',
  'no-weak-types',
  'no-primitive-constructor-types',
  'no-types-missing-file-annotation',
  'object-type-delimiter',
  'require-parameter-type',
  'require-return-type',
  'require-valid-file-annotation',
  'require-variable-type',
  'semi',
  'sort-keys',
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

  if (assertions.misconfigured) {
    for (const misconfiguration of assertions.misconfigured) {
      RuleTester.describe(ruleName, () => {
        RuleTester.describe('misconfigured', () => {
          RuleTester.it(JSON.stringify(misconfiguration.options), () => {
            const schema = validator.getRuleOptionsSchema('flowtype/' + ruleName);
            const validateSchema = validate(schema, {verbose: true});

            validateSchema(misconfiguration.options);
            if (!validateSchema.errors) {
              throw new Error('Schema was valid.');
            }

            assert.deepStrictEqual(validateSchema.errors, misconfiguration.errors);
          });
        });
      });
    }
  }

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
