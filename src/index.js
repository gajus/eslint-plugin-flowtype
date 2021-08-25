/* eslint-disable import/max-dependencies */
import _ from 'lodash';
import recommended from './configs/recommended.json';
import arrayStyleComplexType from './rules/arrayStyleComplexType';
import arrayStyleSimpleType from './rules/arrayStyleSimpleType';
import booleanStyle from './rules/booleanStyle';
import defineFlowType from './rules/defineFlowType';
import delimiterDangle from './rules/delimiterDangle';
import enforceLineBreak from './rules/enforceLineBreak';
import enforceSuppressionCode from './rules/enforceSuppressionCode';
import genericSpacing from './rules/genericSpacing';
import interfaceIdMatch from './rules/interfaceIdMatch';
import newlineAfterFlowAnnotation from './rules/newlineAfterFlowAnnotation';
import noDupeKeys from './rules/noDupeKeys';
import noExistentialType from './rules/noExistentialType';
import noFlowFixMeComments from './rules/noFlowFixMeComments';
import noMutableArray from './rules/noMutableArray';
import noPrimitiveConstructorTypes from './rules/noPrimitiveConstructorTypes';
import noTypesMissingFileAnnotation from './rules/noTypesMissingFileAnnotation';
import noUnusedExpressions from './rules/noUnusedExpressions';
import noWeakTypes from './rules/noWeakTypes';
import noInternalFlowType from './rules/noInternalFlowType';
import noMixed from './rules/noMixed';
import objectTypeCurlySpacing from './rules/objectTypeCurlySpacing';
import objectTypeDelimiter from './rules/objectTypeDelimiter';
import quotes from './rules/quotes';
import requireIndexerName from './rules/requireIndexerName';
import requireCompoundTypeAlias from './rules/requireCompoundTypeAlias';
import requireInexactType from './rules/requireInexactType';
import requireExactType from './rules/requireExactType';
import requireParameterType from './rules/requireParameterType';
import requireReadonlyReactProps from './rules/requireReadonlyReactProps';
import requireReturnType from './rules/requireReturnType';
import requireTypesAtTop from './rules/requireTypesAtTop';
import requireValidFileAnnotation from './rules/requireValidFileAnnotation';
import requireVariableType from './rules/requireVariableType';
import semi from './rules/semi';
import sortKeys from './rules/sortKeys';
import spaceAfterTypeColon from './rules/spaceAfterTypeColon';
import spaceBeforeGenericBracket from './rules/spaceBeforeGenericBracket';
import spaceBeforeTypeColon from './rules/spaceBeforeTypeColon';
import typeIdMatch from './rules/typeIdMatch';
import typeImportStyle from './rules/typeImportStyle';
import unionIntersectionSpacing from './rules/unionIntersectionSpacing';
import useFlowType from './rules/useFlowType';
import useReadOnlySpread from './rules/useReadOnlySpread';
import validSyntax from './rules/validSyntax';
import spreadExactType from './rules/spreadExactType';
import arrowParens from './rules/arrowParens';
import {checkFlowFileAnnotation} from './utilities';

const rules = {
  'array-style-complex-type': arrayStyleComplexType,
  'array-style-simple-type': arrayStyleSimpleType,
  'arrow-parens': arrowParens,
  'boolean-style': booleanStyle,
  'define-flow-type': defineFlowType,
  'delimiter-dangle': delimiterDangle,
  'enforce-line-break': enforceLineBreak,
  'enforce-suppression-code': enforceSuppressionCode,
  'generic-spacing': genericSpacing,
  'interface-id-match': interfaceIdMatch,
  'newline-after-flow-annotation': newlineAfterFlowAnnotation,
  'no-dupe-keys': noDupeKeys,
  'no-existential-type': noExistentialType,
  'no-flow-fix-me-comments': noFlowFixMeComments,
  'no-internal-flow-type': noInternalFlowType,
  'no-mixed': noMixed,
  'no-mutable-array': noMutableArray,
  'no-primitive-constructor-types': noPrimitiveConstructorTypes,
  'no-types-missing-file-annotation': noTypesMissingFileAnnotation,
  'no-unused-expressions': noUnusedExpressions,
  'no-weak-types': noWeakTypes,
  'object-type-curly-spacing': objectTypeCurlySpacing,
  'object-type-delimiter': objectTypeDelimiter,
  quotes,
  'require-compound-type-alias': requireCompoundTypeAlias,
  'require-exact-type': requireExactType,
  'require-indexer-name': requireIndexerName,
  'require-inexact-type': requireInexactType,
  'require-parameter-type': requireParameterType,
  'require-readonly-react-props': requireReadonlyReactProps,
  'require-return-type': requireReturnType,
  'require-types-at-top': requireTypesAtTop,
  'require-valid-file-annotation': requireValidFileAnnotation,
  'require-variable-type': requireVariableType,
  semi,
  'sort-keys': sortKeys,
  'space-after-type-colon': spaceAfterTypeColon,
  'space-before-generic-bracket': spaceBeforeGenericBracket,
  'space-before-type-colon': spaceBeforeTypeColon,
  'spread-exact-type': spreadExactType,
  'type-id-match': typeIdMatch,
  'type-import-style': typeImportStyle,
  'union-intersection-spacing': unionIntersectionSpacing,
  'use-flow-type': useFlowType,
  'use-read-only-spread': useReadOnlySpread,
  'valid-syntax': validSyntax,
};

export default {
  configs: {
    recommended,
  },
  rules: _.mapValues(rules, (rule, key) => {
    if (['no-types-missing-file-annotation', 'require-valid-file-annotation'].includes(key)) {
      return rule;
    }

    return {
      ...rule,
      create: _.partial(checkFlowFileAnnotation, rule.create),
    };
  }),
  rulesConfig: {
    'boolean-style': 0,
    'define-flow-type': 0,
    'delimiter-dangle': 0,
    'generic-spacing': 0,
    'interface-id-match': 0,
    'newline-after-flow-annotation': 0,
    'no-dupe-keys': 0,
    'no-flow-fix-me-comments': 0,
    'no-mixed': 0,
    'no-mutable-array': 0,
    'no-weak-types': 0,
    'object-type-curly-spacing': 0,
    'object-type-delimiter': 0,
    quotes: 0,
    'require-compound-type-alias': 0,
    'require-exact-type': 0,
    'require-parameter-type': 0,
    'require-readonly-react-props': 0,
    'require-return-type': 0,
    'require-variable-type': 0,
    semi: 0,
    'sort-keys': 0,
    'space-after-type-colon': 0,
    'space-before-generic-bracket': 0,
    'space-before-type-colon': 0,
    'spread-exact-type': 0,
    'type-id-match': 0,
    'type-import-style': 0,
    'union-intersection-spacing': 0,
    'use-flow-type': 0,
    'valid-syntax': 0,
  },
};
