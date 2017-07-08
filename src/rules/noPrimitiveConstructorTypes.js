import _ from 'lodash';

const schema = [];

const create = (context) => {
  return {
    GenericTypeAnnotation: (node) => {
      const name = _.get(node, 'id.name');

      if (RegExp(/^(Boolean|Number|String)$/).test(name)) {
        context.report({
          data: {
            name
          },
          loc: node.loc,
          message: 'Unexpected use of {{name}} constructor type.',
          node
        });
      }
    }
  };
};

export default {
  create,
  schema
};
