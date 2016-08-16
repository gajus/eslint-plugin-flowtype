import _ from 'lodash';

export default (identifierNode, context) => {
    if (_.has(identifierNode, 'name')) {
        return identifierNode.name;
    }

    if (_.has(identifierNode, 'left.name')) {
        return identifierNode.left.name;
    }

    if (_.has(identifierNode, 'key.name')) {
        return identifierNode.key.name;
    }

    if (identifierNode.type === 'RestElement') {
        return identifierNode.argument.name;
    }

    if (identifierNode.type === 'ObjectTypeProperty') {
        return context.getSourceCode().getFirstToken(identifierNode, identifierNode.static ? 1 : 0).value;
    }

    if (identifierNode.type === 'FunctionTypeParam') {
        return context.getSourceCode().getFirstToken(identifierNode).value;
    }

    if (identifierNode.type === 'ObjectPattern' || identifierNode.type === 'ArrayPattern') {
        return context.getSourceCode().getText(identifierNode);
    }
    if (_.get(identifierNode, 'left.type') === 'ObjectPattern') {
        return context.getSourceCode().getText(identifierNode.left);
    }

    throw new Error('Unsupported function signature.');
};
