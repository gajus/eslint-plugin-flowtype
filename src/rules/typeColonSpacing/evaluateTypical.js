import _ from 'lodash';
import {getParameterName, quoteName} from '../../utilities';

export default (context, report, typeForMessage) => {
  const sourceCode = context.getSourceCode();

  const getColon = (node, typeAnnotation) => {
    if (node.type === 'FunctionTypeParam') {
      return sourceCode.getFirstToken(node, node.optional ? 2 : 1);
    } else {
      return sourceCode.getFirstToken(typeAnnotation);
    }
  };

  return (node) => {
    const typeAnnotation = _.get(node, 'typeAnnotation') || _.get(node, 'left.typeAnnotation');

    if (typeAnnotation) {
      report({
        colon: getColon(node, typeAnnotation),
        name: quoteName(getParameterName(node, context)),
        node,
        type: typeForMessage + ' type annotation'
      });
    }
  };
};
