import _ from 'lodash';

export default (context) => {
    const annotateReturn = (_.get(context, 'options[0]') || 'always') === 'always';
    const annotateUndefined = (_.get(context, 'options[1].annotateUndefined') || 'never') === 'always';

    const targetNodes = [];

    const registerFunction = (functionNode) => {
        targetNodes.push({
            functionNode
        });
    };

    const isUndefinedReturnType = (returnNode) => {
        return returnNode.argument === null || returnNode.argument.name === 'undefined';
    };

    const evaluateFunction = (functionNode) => {
        const targetNode = targetNodes.pop();

        if (functionNode !== targetNode.functionNode) {
            throw new Error('Mismatch.');
        }

        const isFunctionReturnUndefined = !targetNode.returnStatementNode || isUndefinedReturnType(targetNode.returnStatementNode);
        const isReturnTypeAnnotationUndefined = _.get(targetNode, 'functionNode.returnType.typeAnnotation.type') === 'GenericTypeAnnotation';

        if (isFunctionReturnUndefined && isReturnTypeAnnotationUndefined && !annotateUndefined) {
            context.report(functionNode, 'Must not annotate undefined return type.');
        } else if (isFunctionReturnUndefined && !isReturnTypeAnnotationUndefined && annotateUndefined) {
            context.report(functionNode, 'Must annotate undefined return type.');
        } else if (!isFunctionReturnUndefined && !isReturnTypeAnnotationUndefined) {
            if (annotateReturn && !functionNode.returnType) {
                context.report(functionNode, 'Missing return type annotation.');
            }
        }
    };

    const evaluateNoise = () => {
        targetNodes.pop();
    };

    return {
        ArrowFunctionExpression: registerFunction,
        'ArrowFunctionExpression:exit': evaluateFunction,
        ClassDeclaration: registerFunction,
        'ClassDeclaration:exit': evaluateNoise,
        ClassExpression: registerFunction,
        'ClassExpression:exit': evaluateNoise,
        FunctionDeclaration: registerFunction,
        'FunctionDeclaration:exit': evaluateFunction,
        FunctionExpression: registerFunction,
        'FunctionExpression:exit': evaluateFunction,
        ReturnStatement: (node) => {
            targetNodes[targetNodes.length - 1].returnStatementNode = node;
        }
    };
};
