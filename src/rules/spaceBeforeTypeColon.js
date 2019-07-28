import makeSpacing from './typeColonSpacing';

const schema = [
  {
    enum: ['always', 'never'],
    type: 'string',
  },
];

const create = (context) => {
  return makeSpacing('before', context, {
    always: context.options[0] === 'always',
  });
};

export default {
  create,
  schema,
};
