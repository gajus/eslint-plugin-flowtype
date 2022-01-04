import assert from 'assert';
import Ajv from 'ajv';
import {
  RuleTester,
} from 'eslint';
import {
  camelCase,
} from 'lodash';
import plugin from '../../src';

const ruleTester = new RuleTester({
  parserOptions: {
    babelOptions: {
      plugins: [
        '@babel/plugin-transform-react-jsx',
        '@babel/plugin-syntax-flow',
      ],
    },
    requireConfigFile: false,
  },
});

const reportingRules = [
  'array-style-complex-type',
  'array-style-simple-type',
  'arrow-parens',
  'boolean-style',
  'define-flow-type',
  'delimiter-dangle',
  'enforce-line-break',
  'generic-spacing',
  'interface-id-match',
  'newline-after-flow-annotation',
  'no-dupe-keys',
  'no-duplicate-type-union-intersection-members',
  'no-existential-type',
  'no-flow-fix-me-comments',
  'no-mutable-array',
  'no-primitive-constructor-types',
  'no-types-missing-file-annotation',
  'no-unused-expressions',
  'no-weak-types',
  'no-internal-flow-type',
  'no-mixed',
  'object-type-curly-spacing',
  'object-type-delimiter',
  'quotes',
  'require-compound-type-alias',
  'require-inexact-type',
  'require-indexer-name',
  'require-exact-type',
  'require-parameter-type',
  'require-readonly-react-props',
  'require-return-type',
  'require-types-at-top',
  'require-valid-file-annotation',
  'require-variable-type',
  'semi',
  'sort-keys',
  'sort-type-union-intersection-members',
  'space-after-type-colon',
  'space-before-generic-bracket',
  'space-before-type-colon',
  'spread-exact-type',
  'type-annotation-spacing',
  'type-id-match',
  'type-import-style',
  'union-intersection-spacing',
  'use-flow-type',
  'use-read-only-spread',
  'valid-syntax',
];

const parser = require.resolve('@babel/eslint-parser');
const ajv = new Ajv({
  verbose: true,
});

for (const ruleName of reportingRules) {
  // eslint-disable-next-line import/no-dynamic-require
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
              type: 'array',
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
