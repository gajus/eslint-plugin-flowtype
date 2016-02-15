import requireParameterType from './rules/requireParameterType';
import requireReturnType from './rules/requireReturnType';
import spaceAfterTypeColon from './rules/spaceAfterTypeColon';
import spaceBeforeTypeColon from './rules/spaceBeforeTypeColon';

export default {
    rules: {
        'require-parameter-type': requireParameterType,
        'require-return-type' : requireReturnType,
        'space-after-type-colon': spaceAfterTypeColon,
        'space-before-type-colon': spaceBeforeTypeColon
    },
    rulesConfig: {
        'require-parameter-type': 0,
        'require-return-type': 0,
        'space-after-type-colon': 0,
        'space-before-type-colon': 0
    }
};
