import _ from 'lodash';

const schema = [
  {
    enum: ['always', 'always-multiline', 'only-multiline', 'never'],
    type: 'string'
  },
  {
    enum: ['always', 'always-multiline', 'only-multiline', 'never'],
    type: 'string'
  }
];

const create = (context) => {
  const option = context.options[0] || 'never';
  const interfaceOption = context.options[1] || option;
  const sourceCode = context.getSourceCode();

  const reporter = (node, message, fix) => {
    return () => {
      context.report({
        fix,
        message,
        node
      });
    };
  };

  const makeReporters = (node, tokenToFix) => {
    return {
      dangle: reporter(node, 'Unexpected trailing delimiter', (fixer) => {
        return fixer.replaceText(tokenToFix, '');
      }),
      noDangle: reporter(node, 'Missing trailing delimiter', (fixer) => {
        return fixer.insertTextAfter(tokenToFix, ',');
      })
    };
  };

  const evaluate = (node, lastChildNode) => {
    if (!lastChildNode) {
      return;
    }

    const [penultimateToken, lastToken] = sourceCode.getLastTokens(node, 2);

    const isDangling = [';', ','].includes(penultimateToken.value);
    const isMultiLine = penultimateToken.loc.start.line !== lastToken.loc.start.line;

    const report = makeReporters(lastChildNode, penultimateToken);
    const nodeOption = node.parent.type === 'InterfaceDeclaration' ? interfaceOption : option;

    if (nodeOption === 'always' && !isDangling) {
      report.noDangle();

      return;
    }

    if (nodeOption === 'never' && isDangling) {
      report.dangle();

      return;
    }

    if (nodeOption === 'always-multiline' && !isDangling && isMultiLine) {
      report.noDangle();

      return;
    }

    if (nodeOption === 'always-multiline' && isDangling && !isMultiLine) {
      report.dangle();

      return;
    }

    if (nodeOption === 'only-multiline' && isDangling && !isMultiLine) {
      report.dangle();
    }
  };

  // required for reporting the correct position
  const getLast = (property, indexer) => {
    if (!property) {
      return indexer;
    }

    if (!indexer) {
      return property;
    }

    if (property.loc.end.line > indexer.loc.end.line) {
      return property;
    }

    if (indexer.loc.end.line > property.loc.end.line) {
      return indexer;
    }

    if (property.loc.end.column > indexer.loc.end.column) {
      return property;
    }

    return indexer;
  };

  return {
    ObjectTypeAnnotation (node) {
      evaluate(node, getLast(_.last(node.properties), _.last(node.indexers)));
    },

    TupleTypeAnnotation (node) {
      evaluate(node, _.last(node.types));
    }
  };
};

export default {
  create,
  schema
};
