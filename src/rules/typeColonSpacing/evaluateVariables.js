import _ from 'lodash';
import {getParameterName, quoteName} from '../../utilities';

export default (context, report) => {
  const sourceCode = context.getSourceCode();

  return (node) => {
    const declarations = _.get(node, 'declarations', []);

    _.forEach(declarations, (leaf) => {
      const typeAnnotation = _.get(leaf, 'id.typeAnnotation');

      if (typeAnnotation) {
        report({
          colon: sourceCode.getFirstToken(typeAnnotation),
          name: quoteName(getParameterName(leaf, context)),
          node: leaf,
          type: node.kind + ' type annotation'
        });
      }
    });
  };
};
