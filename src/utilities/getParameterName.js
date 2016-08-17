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
        const text = context.getSourceCode().getText(identifierNode);

        if (identifierNode.typeAnnotation) {
            return text.replace(context.getSourceCode().getText(identifierNode.typeAnnotation), '').trim();
        } else {
            return text;
        }
    }
    if (_.get(identifierNode, 'left.type') === 'ObjectPattern') {
        return context.getSourceCode().getText(identifierNode.left);
    }

    return null;
};
