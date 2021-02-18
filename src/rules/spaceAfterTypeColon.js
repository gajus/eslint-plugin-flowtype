import _ from 'lodash';
import makeSpacing from './typeColonSpacing';

const schema = [
  {
    enum: ['always', 'never'],
    type: 'string',
  },
  {
    additionalProperties: false,
    properties: {
      allowLineBreak: {
        type: 'boolean',
      },
    },
    type: 'object',
  },
];

const create = (context) => {
  return makeSpacing('after', context, {
    allowLineBreak: _.get(context, ['options', '1', 'allowLineBreak'], false),
    always: _.get(context, ['options', '0'], 'always') === 'always',
  });
};

export default {
  create,
  meta: {
    fixable: 'code',
  },
  schema,
};
