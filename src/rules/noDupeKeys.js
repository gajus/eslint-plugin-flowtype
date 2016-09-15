import _ from 'lodash/';
import {
  getParameterName
} from './../utilities';

export default (context) => {
  const report = (node) => {
    context.report({
      loc: node.loc,
      message: 'Duplicate property.',
      node
    });
  };

  const checkForDuplicates = (node) => {
    const haystack = [];

    _.forEach(node.properties, (identifierNode) => {
      const needle = getParameterName(identifierNode, context);

      if (_.includes(haystack, needle)) {
        report(identifierNode);
      } else {
        haystack.push(needle);
      }
    });
  };

  return {
    ObjectTypeAnnotation: checkForDuplicates
  };
};
