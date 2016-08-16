import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes,
    quoteName
} from './../utilities';

export default iterateFunctionNodes((context) => {
    return (functionNode) => {
        _.forEach(functionNode.params, (identifierNode) => {
            const nodeType = _.get(identifierNode, 'type');
            const isAssignmentPattern = nodeType === 'AssignmentPattern';
            const hasTypeAnnotation = Boolean(_.get(identifierNode, 'typeAnnotation'));
            const leftAnnotated = Boolean(_.get(identifierNode, 'left.typeAnnotation'));

            if (isAssignmentPattern && hasTypeAnnotation && !leftAnnotated) {
                context.report({
                    data: {
                        name: quoteName(getParameterName(identifierNode, context))
                    },
                    message: '{{name}}parameter type annotation must be placed on left-hand side of assignment.',
                    node: identifierNode
                });
            }
        });
    };
});
