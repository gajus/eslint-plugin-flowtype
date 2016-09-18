import defineFlowType from './rules/defineFlowType';
import genericSpacing from './rules/genericSpacing';
import noWeakTypes from './rules/noWeakTypes';
import requireParameterType from './rules/requireParameterType';
import requireReturnType from './rules/requireReturnType';
import requireValidFileAnnotation from './rules/requireValidFileAnnotation';
import semi from './rules/semi';
import spaceAfterTypeColon from './rules/spaceAfterTypeColon';
import spaceBeforeGenericBracket from './rules/spaceBeforeGenericBracket';
import spaceBeforeTypeColon from './rules/spaceBeforeTypeColon';
import unionIntersectionSpacing from './rules/unionIntersectionSpacing';
import typeIdMatch from './rules/typeIdMatch';
import useFlowType from './rules/useFlowType';
import validSyntax from './rules/validSyntax';
import booleanStyle from './rules/booleanStyle';
import delimiterDangle from './rules/delimiterDangle';
import noDupeKeys from './rules/noDupeKeys';
import recommended from './configs/recommended.json';

export default {
  configs: {
    recommended
  },
  rules: {
    'boolean-style': booleanStyle,
    'define-flow-type': defineFlowType,
    'delimiter-dangle': delimiterDangle,
    'generic-spacing': genericSpacing,
    'no-dupe-keys': noDupeKeys,
    'no-weak-types': noWeakTypes,
    'require-parameter-type': requireParameterType,
    'require-return-type': requireReturnType,
    'require-valid-file-annotation': requireValidFileAnnotation,
    semi,
    'space-after-type-colon': spaceAfterTypeColon,
    'space-before-generic-bracket': spaceBeforeGenericBracket,
    'space-before-type-colon': spaceBeforeTypeColon,
    'type-id-match': typeIdMatch,
    'union-intersection-spacing': unionIntersectionSpacing,
    'use-flow-type': useFlowType,
    'valid-syntax': validSyntax
  },
  rulesConfig: {
    'boolean-style': 0,
    'define-flow-type': 0,
    'delimiter-dangle': 0,
    'generic-spacing': 0,
    'no-dupe-keys': 0,
    'no-weak-types': 0,
    'require-parameter-type': 0,
    'require-return-type': 0,
    semi: 0,
    'space-after-type-colon': 0,
    'space-before-generic-bracket': 0,
    'space-before-type-colon': 0,
    'type-id-match': 0,
    'union-intersection-spacing': 0,
    'use-flow-type': 0,
    'valid-syntax': 0
  }
};
