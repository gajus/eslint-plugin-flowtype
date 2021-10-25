// eslint-disable-next-line eslint-plugin/prefer-object-rule -- false positive, this is not a rule
export default (iterator) => {
  return (context, ...rest) => {
    const nodeIterator = iterator(context, ...rest);

    return {
      ArrowFunctionExpression: nodeIterator,
      FunctionDeclaration: nodeIterator,
      FunctionExpression: nodeIterator,
      FunctionTypeAnnotation: nodeIterator,
    };
  };
};
