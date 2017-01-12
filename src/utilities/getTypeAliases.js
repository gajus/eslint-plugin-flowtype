import _ from 'lodash';

export default (context) => {
  const sourceCode = context.getSourceCode();
  const astBody = _.get(sourceCode, 'ast.body', []);

  return astBody.filter((node) => {
    return node.type === 'TypeAlias';
  });
};
