const create = (context) => {
  const sourceCode = context.getSourceCode();

  const {
    checkIntersections = true,
    checkUnions = true,
  } = context.options[1] || {};

  const checkForDuplicates = (node) => {
    const uniqueMembers = [];
    const duplicates = [];

    const source = node.types.map((type) => {
      return {
        node: type,
        text: sourceCode.getText(type),
      };
    });

    const hasComments = node.types.some((type) => {
      const count =
        sourceCode.getCommentsBefore(type).length +
        sourceCode.getCommentsAfter(type).length;

      return count > 0;
    });

    const fix = (fixer) => {
      const result = uniqueMembers
        .map((t) => {
          return t.text;
        })
        .join(
          node.type === 'UnionTypeAnnotation' ? ' | ' : ' & ',
        );

      return fixer.replaceText(node, result);
    };

    for (const member of source) {
      const match = uniqueMembers.find((uniqueMember) => {
        return uniqueMember.text === member.text;
      });

      if (match) {
        duplicates.push(member);
      } else {
        uniqueMembers.push(member);
      }
    }

    for (const duplicate of duplicates) {
      context.report({
        data: {
          name: duplicate.text,
          type: node.type === 'UnionTypeAnnotation' ? 'union' : 'intersection',
        },
        messageId: 'duplicate',
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
  };

  return {
    IntersectionTypeAnnotation (node) {
      if (checkIntersections === true) {
        checkForDuplicates(node);
      }
    },
    UnionTypeAnnotation (node) {
      if (checkUnions === true) {
        checkForDuplicates(node);
      }
    },
  };
};

export default {
  create,
  meta: {
    fixable: 'code',
    messages: {
      duplicate: 'Duplicate {{type}} member found "{{name}}".',
      suggestFix: 'Remove duplicate members of type (removes all comments).',
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
        },
        type: 'object',
      },
    ],
  },
};
