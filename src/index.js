import defineFlowType from './rules/defineFlowType';
import genericSpacing from './rules/genericSpacing';
import requireParameterType from './rules/requireParameterType';
import requireReturnType from './rules/requireReturnType';
import requireValidFileAnnotation from './rules/requireValidFileAnnotation';
import spaceAfterTypeColon from './rules/spaceAfterTypeColon';
import spaceBeforeTypeColon from './rules/spaceBeforeTypeColon';
import typeIdMatch from './rules/typeIdMatch';
import useFlowType from './rules/useFlowType';
import validSyntax from './rules/validSyntax';

export default {
    rules: {
        'define-flow-type': defineFlowType,
        'generic-spacing': genericSpacing,
        'require-parameter-type': requireParameterType,
        'require-return-type': requireReturnType,
        'require-valid-file-annotation': requireValidFileAnnotation,
        'space-after-type-colon': spaceAfterTypeColon,
        'space-before-type-colon': spaceBeforeTypeColon,
        'type-id-match': typeIdMatch,
        'use-flow-type': useFlowType,
        'valid-syntax': validSyntax
    },
    rulesConfig: {
        'define-flow-type': 0,
        'generic-spacing': 0,
        'require-parameter-type': 0,
        'require-return-type': 0,
        'space-after-type-colon': 0,
        'space-before-type-colon': 0,
        'type-id-match': 0,
        'use-flow-type': 0,
        'valid-syntax': 0
    }
};
