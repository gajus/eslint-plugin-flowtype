import _ from 'lodash';

export default (identifierNode, context) => {
    if (_.has(identifierNode, 'name')) {
        return identifierNode.name;
    }

    if (_.has(identifierNode, 'left.name')) {
        return identifierNode.left.name;
    }

    if (identifierNode.type === 'RestElement') {
        return identifierNode.argument.name;
    }

    if (identifierNode.type === 'ObjectPattern' || identifierNode.type === 'ArrayPattern') {
        return context.getSourceCode().getText(identifierNode);
    }

    if (_.has(identifierNode, 'left.type') && _.has(identifierNode, 'right.type') &&
        identifierNode.left.type === 'ObjectPattern' && identifierNode.right.type === 'ObjectExpression') {
        return context.getSourceCode().getText(identifierNode.left);
    }

    throw new Error('Unsupported function signature.');
};
