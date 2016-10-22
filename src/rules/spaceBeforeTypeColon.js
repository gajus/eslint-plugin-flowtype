import makeSpacing from './typeColonSpacing';

export default (context) => {
  return makeSpacing('before', context, {
    always: context.options[0] === 'always'
  });
};
