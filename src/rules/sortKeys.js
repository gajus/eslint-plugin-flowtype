import _ from 'lodash';
import {
  getParameterName
} from './../utilities';

const defaults = {
  caseSensitive: true,
  natural: false
};

/**
 * Functions to compare the order of two strings
 *
 * Based on a similar function from eslint's sort-keys rule.
 * https://github.com/eslint/eslint/blob/master/lib/rules/sort-keys.js
 *
 * @private
 */
const isValidOrders = {
  asc (str1, str2) {
    return str1 <= str2;
  },
  ascI (str1, str2) {
    return str1.toLowerCase() <= str2.toLowerCase();
  },
  ascIN (str1, str2) {
    return isValidOrders.naturalCompare(str1.toLowerCase(), str2.toLowerCase()) <= 0;
  },
  ascN (str1, str2) {
    return isValidOrders.naturalCompare(str1, str2) <= 0;
  },
  desc (str1, str2) {
    return isValidOrders.asc(str2, str1);
  },
  descI (str1, str2) {
    return isValidOrders.ascI(str2, str1);
  },
  descIN (str1, str2) {
    return isValidOrders.ascIN(str2, str1);
  },
  descN (str1, str2) {
    return isValidOrders.ascN(str2, str1);
  },
  naturalCompare (str1, str2) {
    return str1.localeCompare(str2, 'en-US', {numeric: true});
  }
};

export default (context) => {
  const order = _.get(context, ['options', 0], 'asc');
  const {natural, caseSensitive} = _.get(context, ['options', 1], defaults);
  const insensitive = caseSensitive === false;

  let prev;
  const checkKeyOrder = (node) => {
    prev = null;

    _.forEach(node.properties, (identifierNode) => {
      const current = getParameterName(identifierNode, context);
      const last = prev;

      // keep track of the last token
      prev = current || last;

      if (!last || !current) {
        return;
      }

      const isValidOrder = isValidOrders[order + (insensitive ? 'I' : '') + (natural ? 'N' : '')];

      if (isValidOrder(last, current) === false) {
        context.report({
          data: {
            current,
            insensitive: insensitive ? 'insensitive ' : '',
            last,
            natural: natural ? 'natural ' : '',
            order
          },
          loc: identifierNode.loc,
          message: 'Expected type annotations to be in {{natural}}{{insensitive}}{{order}}ending order. "{{current}}" should be before "{{last}}".',
          node: identifierNode
        });
      }
    });
  };

  return {
    ObjectTypeAnnotation: checkKeyOrder
  };
};
