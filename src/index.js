import _ from 'lodash';
import recommended from './configs/recommended.json';
import booleanStyle from './rules/booleanStyle';
import defineFlowType from './rules/defineFlowType';
import delimiterDangle from './rules/delimiterDangle';
import genericSpacing from './rules/genericSpacing';
import noDupeKeys from './rules/noDupeKeys';
import noPrimitiveConstructorTypes from './rules/noPrimitiveConstructorTypes';
import noTypesMissingFileAnnotation from './rules/noTypesMissingFileAnnotation';
import noUnusedExpressions from './rules/noUnusedExpressions';
import noWeakTypes from './rules/noWeakTypes';
import objectTypeDelimiter from './rules/objectTypeDelimiter';
import requireParameterType from './rules/requireParameterType';
import requireReadOnlyArray from './rules/requireReadOnlyArray';
import requireReturnType from './rules/requireReturnType';
import requireValidFileAnnotation from './rules/requireValidFileAnnotation';
import requireVariableType from './rules/requireVariableType';
import semi from './rules/semi';
import sortKeys from './rules/sortKeys';
import spaceAfterTypeColon from './rules/spaceAfterTypeColon';
import spaceBeforeGenericBracket from './rules/spaceBeforeGenericBracket';
import spaceBeforeTypeColon from './rules/spaceBeforeTypeColon';
import typeIdMatch from './rules/typeIdMatch';
import unionIntersectionSpacing from './rules/unionIntersectionSpacing';
import useFlowType from './rules/useFlowType';
import validSyntax from './rules/validSyntax';
import {checkFlowFileAnnotation} from './utilities';

const rules = {
  'boolean-style': booleanStyle,
  'define-flow-type': defineFlowType,
  'delimiter-dangle': delimiterDangle,
  'generic-spacing': genericSpacing,
  'no-dupe-keys': noDupeKeys,
  'no-primitive-constructor-types': noPrimitiveConstructorTypes,
  'no-types-missing-file-annotation': noTypesMissingFileAnnotation,
  'no-unused-expressions': noUnusedExpressions,
  'no-weak-types': noWeakTypes,
  'object-type-delimiter': objectTypeDelimiter,
  'require-parameter-type': requireParameterType,
  'require-read-only-array': requireReadOnlyArray,
  'require-return-type': requireReturnType,
  'require-valid-file-annotation': requireValidFileAnnotation,
  'require-variable-type': requireVariableType,
  semi,
  'sort-keys': sortKeys,
  'space-after-type-colon': spaceAfterTypeColon,
  'space-before-generic-bracket': spaceBeforeGenericBracket,
  'space-before-type-colon': spaceBeforeTypeColon,
  'type-id-match': typeIdMatch,
  'union-intersection-spacing': unionIntersectionSpacing,
  'use-flow-type': useFlowType,
  'valid-syntax': validSyntax
};

export default {
  configs: {
    recommended
  },
  rules: _.mapValues(rules, (rule, key) => {
    if (key === 'no-types-missing-file-annotation') {
      return rule;
    }

    return {
      ...rule,
      create: _.partial(checkFlowFileAnnotation, rule.create)
    };
  }),
  rulesConfig: {
    'boolean-style': 0,
    'define-flow-type': 0,
    'delimiter-dangle': 0,
    'generic-spacing': 0,
    'no-dupe-keys': 0,
    'no-weak-types': 0,
    'object-type-delimiter': 0,
    'require-parameter-type': 0,
    'require-read-only-array': 0,
    'require-return-type': 0,
    'require-variable-type': 0,
    semi: 0,
    'sort-keys': 0,
    'space-after-type-colon': 0,
    'space-before-generic-bracket': 0,
    'space-before-type-colon': 0,
    'type-id-match': 0,
    'union-intersection-spacing': 0,
    'use-flow-type': 0,
    'valid-syntax': 0
  }
};
