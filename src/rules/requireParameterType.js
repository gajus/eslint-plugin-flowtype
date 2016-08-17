import _ from 'lodash';
import {
    getParameterName,
    isFlowFile,
    iterateFunctionNodes,
    quoteName
} from './../utilities';

const skipConciseArrows = (skipArrowsOption) => {
    return ['expressionsOnly', 'conciseOnly'].indexOf(skipArrowsOption) !== -1;
};

export default iterateFunctionNodes((context) => {
    const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

    if (!checkThisFile) {
        return () => {};
    }

    const skipArrows = _.get(context, 'options[0].excludeArrowFunctions');

    return (functionNode) => {
        _.forEach(functionNode.params, (identifierNode) => {
            const typeAnnotation = _.get(identifierNode, 'typeAnnotation') || _.get(identifierNode, 'left.typeAnnotation');

            const isArrow = functionNode.type === 'ArrowFunctionExpression';
            const isArrowFunctionExpression = isArrow && functionNode.expression;

            if (skipConciseArrows(skipArrows) && isArrowFunctionExpression || skipArrows === true && isArrow) {
                return;
            }

            if (!typeAnnotation) {
                context.report({
                    data: {
                        name: quoteName(getParameterName(identifierNode, context))
                    },
                    message: 'Missing {{name}}parameter type annotation.',
                    node: identifierNode
                });
            }
        });
    };
});
