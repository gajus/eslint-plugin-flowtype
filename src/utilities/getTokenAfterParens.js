const getTokenAfterParens = (sourceCode, node) => {
  let token;

  token = sourceCode.getTokenAfter(node);

  while (token.type === 'Punctuator' && token.value === ')') {
    token = sourceCode.getTokenAfter(token);
  }

  return token;
};

export default getTokenAfterParens;
