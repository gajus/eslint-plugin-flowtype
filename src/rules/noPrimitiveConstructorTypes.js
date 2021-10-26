import _ from 'lodash';

const schema = [];

const create = (context) => {
  const regex = /^(Boolean|Number|String)$/u;

  return {
    GenericTypeAnnotation: (node) => {
      const name = _.get(node, 'id.name');

      if (regex.test(name)) {
        context.report({
          data: {
            name,
          },
          loc: node.loc,
          message: 'Unexpected use of {{name}} constructor type.',
          node,
        });
      }
    },
  };
};

export default {
  create,
  schema,
};
