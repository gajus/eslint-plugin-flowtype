export default (context, report) => {
  const sourceCode = context.getSourceCode();

  return (functionNode) => {
    // skip FunctionTypeAnnotation, possibly another rule as it's an arrow, not a colon?
    // (foo: number) => string
    //              ^^^^
    if (functionNode.returnType && functionNode.type !== 'FunctionTypeAnnotation') {
      report({
        colon: sourceCode.getFirstToken(functionNode.returnType),
        node: functionNode,
        type: 'return type',
      });
    }
  };
};
