export default (iterator) => {
  return (context, ...rest) => {
    const nodeIterator = iterator(context, ...rest);

    return {
      ArrowFunctionExpression: nodeIterator,
      FunctionDeclaration: nodeIterator,
      FunctionExpression: nodeIterator,
      FunctionTypeAnnotation: nodeIterator
    };
  };
};
