import {
  getTokenAfterParens, getTokenBeforeParens,
} from '../../utilities';

export default (context, report) => {
  const sourceCode = context.getSourceCode();

  return (objectTypeIndexer) => {
    // type X = { [a: b]: c }
    //              ^
    report({
      colon: getTokenBeforeParens(sourceCode, objectTypeIndexer.key),
      node: objectTypeIndexer,
    });

    // type X = { [a: b]: c }
    //                  ^
    report({
      colon: sourceCode.getTokenAfter(getTokenAfterParens(sourceCode, objectTypeIndexer.key)),
      node: objectTypeIndexer,
    });
  };
};
