const groups = {
  function: 'function',
  intersection: 'intersection',
  keyword: 'keyword',
  literal: 'literal',
  named: 'named',
  nullish: 'nullish',
  object: 'object',
  tuple: 'tuple',
  union: 'union',
  unknown: 'unknown',
};

// eslint-disable-next-line complexity
const getGroup = (node) => {
  // eslint-disable-next-line default-case
  switch (node.type) {
  case 'FunctionTypeAnnotation':
    return groups.function;

  case 'IntersectionTypeAnnotation':
    return groups.intersection;

  case 'AnyTypeAnnotation':
  case 'BooleanTypeAnnotation':
  case 'NumberTypeAnnotation':
  case 'StringTypeAnnotation':
  case 'SymbolTypeAnnotation':
  case 'ThisTypeAnnotation':
    return groups.keyword;

  case 'NullLiteralTypeAnnotation':
  case 'NullableTypeAnnotation':
  case 'VoidTypeAnnotation':
    return groups.nullish;

  case 'BooleanLiteralTypeAnnotation':
  case 'NumberLiteralTypeAnnotation':
  case 'StringLiteralTypeAnnotation':
    return groups.literal;

  case 'ArrayTypeAnnotation':
  case 'IndexedAccessType':
  case 'GenericTypeAnnotation':
  case 'OptionalIndexedAccessType':
    return groups.named;

  case 'ObjectTypeAnnotation':
    return groups.object;

  case 'TupleTypeAnnotation':
    return groups.tuple;

  case 'UnionTypeAnnotation':
    return groups.union;
  }

  return groups.unknown;
};

const fallbackSort = (a, b) => {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
};

const sorters = {
  asc: (collator, a, b) => {
    return collator.compare(a, b) || fallbackSort(a, b);
  },
  desc: (collator, a, b) => {
    return collator.compare(b, a) || fallbackSort(b, a);
  },
};

const create = (context) => {
  const sourceCode = context.getSourceCode();

  const {
    checkIntersections = true,
    checkUnions = true,
    groupOrder = [
      groups.keyword,
      groups.named,
      groups.literal,
      groups.function,
      groups.object,
      groups.tuple,
      groups.intersection,
      groups.union,
      groups.nullish,
    ],
    order = 'asc',
  } = context.options[1] || {};

  const sort = sorters[order];

  const collator = new Intl.Collator('en', {
    numeric: true,
    sensitivity: 'base',
  });

  const checkSorting = (node) => {
    const sourceOrder = node.types.map((type) => {
      const group = groupOrder?.indexOf(getGroup(type)) ?? -1;

      return {
        group: group === -1 ? Number.MAX_SAFE_INTEGER : group,
        node: type,
        text: sourceCode.getText(type),
      };
    });

    const expectedOrder = [...sourceOrder].sort((a, b) => {
      if (a.group !== b.group) {
        return a.group - b.group;
      }

      return sort(collator, a.text, b.text);
    });

    const hasComments = node.types.some((type) => {
      const count =
        sourceCode.getCommentsBefore(type).length +
        sourceCode.getCommentsAfter(type).length;

      return count > 0;
    });

    let prev = null;

    for (let i = 0; i < expectedOrder.length; i += 1) {
      const type = node.type === 'UnionTypeAnnotation' ? 'union' : 'intersection';
      const current = sourceOrder[i].text;
      const last = prev;

      // keep track of the last token
      prev = current || last;

      if (!last || !current) {
        continue;
      }

      if (expectedOrder[i].node !== sourceOrder[i].node) {
        const data = {
          current,
          last,
          order,
          type,
        };

        const fix = (fixer) => {
          const sorted = expectedOrder
            .map((t) => {
              return t.text;
            })
            .join(
              node.type === 'UnionTypeAnnotation' ? ' | ' : ' & ',
            );

          return fixer.replaceText(node, sorted);
        };

        context.report({
          data,
          messageId: 'notSorted',
          node,

          // don't autofix if any of the types have leading/trailing comments
          // the logic for preserving them correctly is a pain - we may implement this later
          ...hasComments ?
            {
              suggest: [
                {
                  fix,
                  messageId: 'suggestFix',
                },
              ],
            } :
            {fix},
        });
      }
    }
  };

  return {
    IntersectionTypeAnnotation (node) {
      if (checkIntersections === true) {
        checkSorting(node);
      }
    },
    UnionTypeAnnotation (node) {
      if (checkUnions === true) {
        checkSorting(node);
      }
    },
  };
};

export default {
  create,
  meta: {
    fixable: 'code',
    messages: {
      notSorted: 'Expected {{type}} members to be in {{order}}ending order. "{{current}}" should be before "{{last}}".',
      suggestFix: 'Sort members of type (removes all comments).',
    },
    schema: [
      {
        properties: {
          checkIntersections: {
            type: 'boolean',
          },
          checkUnions: {
            type: 'boolean',
          },
          groupOrder: {
            items: {
              enum: Object.keys(groups),
              type: 'string',
            },
            type: 'array',
          },
          order: {
            enum: ['asc', 'desc'],
            type: 'string',
          },
        },
        type: 'object',
      },
    ],
  },
};
