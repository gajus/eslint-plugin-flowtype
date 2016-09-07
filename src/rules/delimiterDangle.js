import _ from 'lodash';

export default (context) => {
  const option = context.options[0] || 'never';
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

    const isDangling = [';', ','].indexOf(penultimateToken.value) > -1;
    const isMultiLine = penultimateToken.loc.start.line !== lastToken.loc.start.line;

    const report = makeReporters(lastChildNode, penultimateToken);

    if (option === 'always' && !isDangling) {
      report.noDangle();

      return;
    }

    if (option === 'never' && isDangling) {
      report.dangle();

      return;
    }

    if (option === 'always-multiline' && !isDangling && isMultiLine) {
      report.noDangle();

      return;
    }

    if (option === 'always-multiline' && isDangling && !isMultiLine) {
      report.dangle();

      return;
    }

    if (option === 'only-multiline' && isDangling && !isMultiLine) {
      report.dangle();

      return;
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
