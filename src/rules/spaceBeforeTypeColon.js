import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes,
    spacingFixers,
    quoteName,
    getTokenBeforeParens,
    getTokenAfterParens
} from './../utilities';

const parseOptions = (context) => {
  return {
    always: context.options[0] === 'always'
  };
};

const propertyEvaluator = (context, typeForMessage) => {
  const {always} = parseOptions(context);

  const sourceCode = context.getSourceCode();

  const getSpacesBeforeColon = (node, typeAnnotation) => {
    if (node.type === 'FunctionTypeParam') {
            // the colon isn't included in the typeAnnotation node here...
      const colon = sourceCode.getTokenBefore(typeAnnotation);
      const tokenBeforeColon = sourceCode.getTokenBefore(colon);

      return {
        spaces: colon.start - tokenBeforeColon.end,
        tokenBeforeType: tokenBeforeColon
      };
    } else {
            // tokenBeforeColon can be the identifier or the closing } token of a destructuring
      const tokenBeforeColon = sourceCode.getTokenBefore(typeAnnotation);

      return {
        spaces: typeAnnotation.start - tokenBeforeColon.end,
        tokenBeforeType: tokenBeforeColon
      };
    }
  };

  return (node) => {
    const typeAnnotation = _.get(node, 'typeAnnotation') || _.get(node, 'left.typeAnnotation');

    if (typeAnnotation) {
            // tokenBeforeType can be the identifier or the closing } token of a destructuring
      const {spaces, tokenBeforeType} = getSpacesBeforeColon(node, typeAnnotation);

      const data = {
        name: quoteName(getParameterName(node, context)),
        type: typeForMessage
      };

      if (always && spaces > 1) {
        context.report({
          data,
          fix: spacingFixers.stripSpacesAfter(tokenBeforeType, spaces - 1),
          message: 'There must be 1 space before {{name}}{{type}} type annotation colon.',
          node
        });
      } else if (always && spaces === 0) {
        context.report({
          data,
          fix: spacingFixers.addSpaceAfter(tokenBeforeType),
          message: 'There must be a space before {{name}}{{type}} type annotation colon.',
          node
        });
      } else if (!always && spaces > 0) {
        context.report({
          data,
          fix: spacingFixers.stripSpacesAfter(tokenBeforeType, spaces),
          message: 'There must be no space before {{name}}{{type}} type annotation colon.',
          node
        });
      }
    }
  };
};

const functionEvaluators = iterateFunctionNodes((context) => {
  const checkParam = propertyEvaluator(context, 'parameter');

  return (functionNode) => {
    _.forEach(functionNode.params, checkParam);
  };
});

const objectTypePropertyEvaluator = (context) => {
  const {always} = parseOptions(context);

  const sourceCode = context.getSourceCode();

  const getFirstTokens = (objectTypeProperty) => {
    const tokens = sourceCode.getFirstTokens(objectTypeProperty, 4);

    let tokenIndex = 0; // eslint-disable-line init-declarations

    if (objectTypeProperty.optional) {
      tokenIndex++;
    }

    if (objectTypeProperty.static) {
      tokenIndex++;
    }

    if (objectTypeProperty.variance) {
      tokenIndex++;
    }


    return [tokens[tokenIndex], tokens[tokenIndex + 1]];
  };

  return (objectTypeProperty) => {
    // tokenBeforeColon can be identifier, or a ? token if is optional
    const [tokenBeforeColon, colon] = getFirstTokens(objectTypeProperty);
    const spaces = colon.start - tokenBeforeColon.end;

    const data = {
      name: quoteName(getParameterName(objectTypeProperty, context))
    };

    if (always && spaces > 1) {
      context.report({
        data,
        fix: spacingFixers.stripSpacesAfter(tokenBeforeColon, spaces - 1),
        message: 'There must be 1 space before {{name}}type annotation colon.',
        node: objectTypeProperty
      });
    } else if (always && spaces === 0) {
      context.report({
        data,
        fix: spacingFixers.addSpaceAfter(tokenBeforeColon),
        message: 'There must be a space before {{name}}type annotation colon.',
        node: objectTypeProperty
      });
    } else if (!always && spaces > 0) {
      context.report({
        data,
        fix: spacingFixers.stripSpacesAfter(tokenBeforeColon, spaces),
        message: 'There must be no space before {{name}}type annotation colon.',
        node: objectTypeProperty
      });
    }
  };
};

const objectTypeIndexerEvaluator = (context) => {
  const {always} = parseOptions(context);

  const sourceCode = context.getSourceCode();

  // type X = { [a: b]: c }
  //              ^
  const checkIndexerKey = (objectTypeIndexer) => {
    // babel-eslint deletes ObjectTypeIndexer's id, have to check the raw tokens instead
    const colonToken = getTokenBeforeParens(sourceCode, objectTypeIndexer.key);
    const idToken = sourceCode.getTokenBefore(colonToken);
    const spaces = colonToken.start - idToken.end;

    if (always && spaces > 1) {
      context.report({
        fix: spacingFixers.stripSpacesAfter(idToken, spaces - 1),
        message: 'There must be 1 space before type annotation colon.',
        node: objectTypeIndexer
      });
    } else if (always && spaces === 0) {
      context.report({
        fix: spacingFixers.addSpaceAfter(idToken),
        message: 'There must be a space before type annotation colon.',
        node: objectTypeIndexer
      });
    } else if (!always && spaces > 0) {
      context.report({
        fix: spacingFixers.stripSpacesAfter(idToken, spaces),
        message: 'There must be no space before type annotation colon.',
        node: objectTypeIndexer
      });
    }
  };

  // type X = { [a: b]: c }
  //                  ^
  const checkIndexerValue = (objectTypeIndexer) => {
    const tokenBeforeColon = getTokenAfterParens(sourceCode, objectTypeIndexer.key);
    const colonToken = sourceCode.getTokenAfter(tokenBeforeColon);

    const spaces = colonToken.start - tokenBeforeColon.end;

    if (always && spaces > 1) {
      context.report({
        fix: spacingFixers.stripSpacesAfter(tokenBeforeColon, spaces - 1),
        message: 'There must be 1 space before type annotation colon.',
        node: objectTypeIndexer
      });
    } else if (always && spaces === 0) {
      context.report({
        fix: spacingFixers.addSpaceAfter(tokenBeforeColon),
        message: 'There must be a space before type annotation colon.',
        node: objectTypeIndexer
      });
    } else if (!always && spaces > 0) {
      context.report({
        fix: spacingFixers.stripSpacesAfter(tokenBeforeColon, spaces),
        message: 'There must be no space before type annotation colon.',
        node: objectTypeIndexer
      });
    }
  };

  return (objectTypeIndexer) => {
    checkIndexerKey(objectTypeIndexer);
    checkIndexerValue(objectTypeIndexer);
  };
};

const typeCastEvaluator = (context) => {
  const sourceCode = context.getSourceCode();
  const {always} = parseOptions(context);

  return (typeCastExpression) => {
    const lastTokenOfIdentifier = sourceCode.getTokenBefore(typeCastExpression.typeAnnotation);
    const spaces = typeCastExpression.typeAnnotation.start - lastTokenOfIdentifier.end;

    if (always && spaces > 1) {
      context.report({
        fix: spacingFixers.stripSpacesAfter(lastTokenOfIdentifier, spaces - 1),
        message: 'There must be 1 space before type cast colon.',
        node: typeCastExpression
      });
    } else if (always && spaces === 0) {
      context.report({
        fix: spacingFixers.addSpaceAfter(lastTokenOfIdentifier),
        message: 'There must be a space before type cast colon.',
        node: typeCastExpression
      });
    } else if (!always && spaces > 0) {
      context.report({
        fix: spacingFixers.stripSpacesAfter(lastTokenOfIdentifier, spaces),
        message: 'There must be no space before type cast colon.',
        node: typeCastExpression
      });
    }
  };
};

export default (context) => {
  return {
    ...functionEvaluators(context),
    ClassProperty: propertyEvaluator(context, 'class property'),
    ObjectTypeIndexer: objectTypeIndexerEvaluator(context),
    ObjectTypeProperty: objectTypePropertyEvaluator(context),
    TypeCastExpression: typeCastEvaluator(context)
  };
};
