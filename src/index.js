import requireParameterType from './rules/requireParameterType';
import requireReturnType from './rules/requireReturnType';
import spaceAfterTypeColon from './rules/spaceAfterTypeColon';
import spaceBeforeTypeColon from './rules/spaceBeforeTypeColon';
import typeIdMatch from './rules/typeIdMatch';

export default {
    rules: {
        'require-parameter-type': requireParameterType,
        'require-return-type': requireReturnType,
        'space-after-type-colon': spaceAfterTypeColon,
        'space-before-type-colon': spaceBeforeTypeColon,
        'type-id-match': typeIdMatch
    },
    rulesConfig: {
        'require-parameter-type': 0,
        'require-return-type': 0,
        'space-after-type-colon': 0,
        'space-before-type-colon': 0,
        'type-id-match': 0
    }
};
