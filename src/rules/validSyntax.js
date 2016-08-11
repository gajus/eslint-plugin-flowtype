import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes
} from './../utilities';

export default iterateFunctionNodes((context) => {
    return (functionNode) => {
        _.forEach(functionNode.params, (identifierNode) => {
            const parameterName = getParameterName(identifierNode, context);
            const nodeType = _.get(identifierNode, 'type');
            const isAssignmentPattern = nodeType === 'AssignmentPattern';
            const hasTypeAnnotation = Boolean(_.get(identifierNode, 'typeAnnotation'));
            const leftAnnotated = Boolean(_.get(identifierNode, 'left.typeAnnotation'));

            if (isAssignmentPattern && hasTypeAnnotation && !leftAnnotated) {
                context.report(identifierNode, '"' + parameterName + '" parameter type annotation must be placed on left-hand side of assignment.');
            }
        });
    };
});
