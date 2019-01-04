import assert from 'assert';
import {
  camelCase
} from 'lodash';
import Ajv from 'ajv';
import {
  RuleTester
} from 'eslint';
import plugin from '../../src';

const ruleTester = new RuleTester();

const reportingRules = [
  'array-style-complex-type',
  'array-style-simple-type',
  'boolean-style',
  'define-flow-type',
  'delimiter-dangle',
  'generic-spacing',
  'newline-after-flow-annotation',
  'no-dupe-keys',
  'no-existential-type',
  'no-flow-fix-me-comments',
  'no-mutable-array',
  'no-primitive-constructor-types',
  'no-types-missing-file-annotation',
  'no-unused-expressions',
  'no-weak-types',
  'no-mixed',
  'object-type-delimiter',
  'require-compound-type-alias',
  'require-exact-type',
  'require-parameter-type',
  'require-return-type',
  'require-types-at-top',
  'require-valid-file-annotation',
  'require-variable-type',
  'semi',
  'sort-keys',
  'space-after-type-colon',
  'space-before-generic-bracket',
  'space-before-type-colon',
  'type-id-match',
  'type-import-style',
  'union-intersection-spacing',
  'use-flow-type',
  'valid-syntax'
];

const parser = require.resolve('babel-eslint');
const ajv = new Ajv({
  verbose: true
});

for (const ruleName of reportingRules) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const assertions = require('./assertions/' + camelCase(ruleName));

  if (assertions.misconfigured) {
    for (const misconfiguration of assertions.misconfigured) {
      RuleTester.describe(ruleName, () => {
        RuleTester.describe('misconfigured', () => {
          RuleTester.it(JSON.stringify(misconfiguration.options), () => {
            const schema = plugin.rules[ruleName].schema && plugin.rules[ruleName].schema;

            if (!schema) {
              throw new Error('No schema.');
            }

            const validateSchema = ajv.compile({
              items: schema,
              type: 'array'
            });

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

  assertions.invalid = assertions.invalid.map((assertion) => {
    assertion.parser = parser;

    return assertion;
  });

  assertions.valid = assertions.valid.map((assertion) => {
    assertion.parser = parser;

    return assertion;
  });

  ruleTester.run(ruleName, plugin.rules[ruleName], assertions);
}
