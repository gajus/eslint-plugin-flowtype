export default (context, report) => {
  const sourceCode = context.getSourceCode();

  return (typeCastExpression) => {
    report({
      colon: sourceCode.getFirstToken(typeCastExpression.typeAnnotation),
      node: typeCastExpression,
      type: 'type cast',
    });
  };
};
