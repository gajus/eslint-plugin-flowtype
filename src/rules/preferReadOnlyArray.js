import _ from 'lodash';

export default {
  create: (context) => {
    return {
      GenericTypeAnnotation: (node) => {
        const name = _.get(node, 'id.name');

        if (name === 'Array') {
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
  },
  meta: {},
  schema: {}
};
