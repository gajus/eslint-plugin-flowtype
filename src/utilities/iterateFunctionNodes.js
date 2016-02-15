export default (iterator) => {
    return (context) => {
        const nodeIterator = iterator(context);

        return {
            ArrowFunctionExpression: nodeIterator,
            FunctionDeclaration: nodeIterator,
            FunctionExpression: nodeIterator
        };
    };
};
