import _ from 'lodash';
import {
  getParameterName,
} from '../utilities';

const defaults = {
  caseSensitive: true,
  natural: false,
};

const schema = [
  {
    enum: ['asc', 'desc'],
    type: 'string',
  },
  {
    additionalProperties: false,
    properties: {
      caseSensitive: {
        type: 'boolean',
      },
      natural: {
        type: 'boolean',
      },
    },
    type: 'object',
  },
];

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
  },
};

const variances = {
  minus: '-',
  plus: '+',
};

const getVariance = (node) => {
  if (_.isString(node.variance)) {
    return variances[node.variance] || '';
  } else if (_.get(node, 'variance.type') === 'Variance') {
    return variances[node.variance.kind] || '';
  } else {
    return '';
  }
};

const generateOrderedList = (context, sort, properties) => {
  return properties.map((property) => {
    const name = getParameterName(property, context);
    let value;

    if (property.type === 'ObjectTypeSpreadProperty') {
      return ['...' + property.argument.id.name];
    } else if (property.value.type === 'ObjectTypeAnnotation') {
      // eslint-disable-next-line no-use-before-define
      value = generateFix(property.value, context, sort);
    } else {
      value = context.getSourceCode().getText(property.value);
    }

    return [name, getVariance(property) + name + (property.optional ? '?' : ''), value];
  })
    .sort((first, second) => {
      return sort(first[0], second[0]) ? -1 : 1;
    })
    .map((item) => {
      if (item.length === 1) {
        return item[0];
      }

      return item[1] + ': ' + item[2];
    });
};

const generateFix = (node, context, sort) => {
  // this could be done much more cleanly in ESLint >=4
  // as we can apply multiple fixes. That also means we can
  // maintain code style in a much nicer way
  let nodeText;
  const newTypes = generateOrderedList(context, sort, node.properties);
  const source = context.getSourceCode(node);

  const originalSubstring = source.getText(node);

  nodeText = originalSubstring;

  node.properties.forEach((property, index) => {
    const subString = source.getText(property);
    const addComma = subString[subString.length - 1] === ',';

    nodeText = nodeText.replace(subString, '$' + index + (addComma ? ',' : ''));
  });

  newTypes.forEach((item, index) => {
    nodeText = nodeText.replace('$' + index, item);
  });

  return nodeText;
};

const create = (context) => {
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
            order,
          },
          fix (fixer) {
            const nodeText = generateFix(node, context, isValidOrder);

            return fixer.replaceText(node, nodeText);
          },
          loc: identifierNode.loc,
          message: 'Expected type annotations to be in {{natural}}{{insensitive}}{{order}}ending order. "{{current}}" should be before "{{last}}".',
          node: identifierNode,
        });
      }
    });
  };

  return {
    ObjectTypeAnnotation: checkKeyOrder,
  };
};

export default {
  create,
  schema,
};
