import _ from 'lodash';
import {
    getParameterName,
    isFlowFile,
    iterateFunctionNodes
} from './../utilities';

export default iterateFunctionNodes((context) => {
    const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

    const ignoreParameterNames = _.get(context, 'options[1].ignoreParameterNames', []);

    if (!checkThisFile) {
        return () => {};
    }

    return (functionNode) => {
        _.forEach(functionNode.params, (identifierNode) => {
            const parameterName = getParameterName(identifierNode, context);
            const ignoreThisParameter = _.includes(ignoreParameterNames, parameterName);
            const typeAnnotation = _.get(identifierNode, 'typeAnnotation') || _.get(identifierNode, 'left.typeAnnotation');

            if (!typeAnnotation && !ignoreThisParameter) {
                context.report(identifierNode, 'Missing "' + parameterName + '" parameter type annotation.');
            }
        });
    };
});
