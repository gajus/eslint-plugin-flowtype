const getTokenBeforeParens = (sourceCode, node) => {
  let token;

  token = sourceCode.getTokenBefore(node);

  while (token.type === 'Punctuator' && token.value === '(') {
    token = sourceCode.getTokenBefore(token);
  }

  return token;
};

export default getTokenBeforeParens;
