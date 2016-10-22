import makeSpacing from './typeColonSpacing';

export default (context) => {
  return makeSpacing('after', context, {
    always: (context.options[0] || 'always') === 'always'
  });
};
