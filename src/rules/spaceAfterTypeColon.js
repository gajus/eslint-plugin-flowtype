import _ from 'lodash';
import makeSpacing from './typeColonSpacing';

export default (context) => {
  return makeSpacing('after', context, {
    allowLineBreak: _.get(context, ['options', '1', 'allowLineBreak'], false),
    always: _.get(context, ['options', '0'], 'always') === 'always'
  });
};
