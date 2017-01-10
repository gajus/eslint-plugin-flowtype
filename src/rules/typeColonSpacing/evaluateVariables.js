import _ from 'lodash';
import {getParameterName, quoteName} from '../../utilities';

export default (context, report) => {
  const sourceCode = context.getSourceCode();

  const getColon = (node, typeAnnotation) => {
    if (node.type === 'FunctionTypeParam') {
      return sourceCode.getFirstToken(node, node.optional ? 2 : 1);
    } else {
      return sourceCode.getFirstToken(typeAnnotation);
    }
  };

  return (node) => {
    const declarations = _.get(node, 'declarations', []);

    _.forEach(declarations, (leaf) => {
      const typeAnnotation = _.get(leaf, 'id.typeAnnotation');

      if (typeAnnotation) {
        report({
          colon: getColon(leaf, typeAnnotation),
          name: quoteName(getParameterName(leaf, context)),
          node: leaf,
          type: node.kind + ' type annotation'
        });
      }
    });
  };
};
