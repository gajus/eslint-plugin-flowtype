import _ from 'lodash';

const schema = [];

const create = (context) => {
  return {
    MixedTypeAnnotation (node) {
      context.report({
        message: 'Unexpected use of mixed type',
        node
      });
    }
  };
};

export default {
  create,
  schema
};
