import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes,
    spacingFixers,
    quoteName
} from './../utilities';

const parseOptions = (context) => {
  return {
    always: (context.options[0] || 'always') === 'always'
  };
};

const propertyEvaluator = (context, typeForMessage) => {
  const {always} = parseOptions(context);

  const sourceCode = context.getSourceCode();

  const getSpacesAfterColon = (node, typeAnnotation) => {
    if (node.type === 'FunctionTypeParam') {
      const colon = sourceCode.getFirstToken(node, node.optional ? 2 : 1);

      return {
        colon,
        spaceAfter: sourceCode.getTokenAfter(colon).start - colon.end
      };
    } else {
      const [colon, token] = sourceCode.getFirstTokens(typeAnnotation, 2);

      return {
        colon,
        spaceAfter: token.start - typeAnnotation.start - 1
      };
    }
  };

  return (node) => {
    const typeAnnotation = _.get(node, 'typeAnnotation') || _.get(node, 'left.typeAnnotation');

    if (typeAnnotation) {
      const {colon, spaceAfter} = getSpacesAfterColon(node, typeAnnotation);

      const data = {
        name: quoteName(getParameterName(node, context)),
        type: typeForMessage
      };

      if (always && spaceAfter > 1) {
        context.report({
          data,
          fix: spacingFixers.stripSpacesAfter(colon, spaceAfter - 1),
          message: 'There must be 1 space after {{name}}{{type}} type annotation colon.',
          node
        });
      } else if (always && spaceAfter === 0) {
        context.report({
          data,
          fix: spacingFixers.addSpaceAfter(colon),
          message: 'There must be a space after {{name}}{{type}} type annotation colon.',
          node
        });
      } else if (!always && spaceAfter > 0) {
        context.report({
          data,
          fix: spacingFixers.stripSpacesAfter(colon, spaceAfter),
          message: 'There must be no space after {{name}}{{type}} type annotation colon.',
          node
        });
      }
    }
  };
};

const returnTypeEvaluator = (context) => {
  const {always} = parseOptions(context);

  const sourceCode = context.getSourceCode();

  return (functionNode) => {
        // skip FunctionTypeAnnotation, possibly another rule as it's an arrow, not a colon?
        // (foo: number) => string
        //              ^^^^
    if (functionNode.returnType && functionNode.type !== 'FunctionTypeAnnotation') {
      const [colon, token] = sourceCode.getFirstTokens(functionNode.returnType, 2);
      const spaces = token.start - functionNode.returnType.start - 1;

      if (always && spaces > 1) {
        context.report({
          fix: spacingFixers.stripSpacesAfter(colon, spaces - 1),
          message: 'There must be 1 space after return type colon.',
          node: functionNode
        });
      } else if (always && spaces === 0) {
        context.report({
          fix: spacingFixers.addSpaceAfter(colon),
          message: 'There must be a space after return type colon.',
          node: functionNode
        });
      } else if (!always && spaces > 0) {
        context.report({
          fix: spacingFixers.stripSpacesAfter(colon, spaces),
          message: 'There must be no space after return type colon.',
          node: functionNode
        });
      }
    }
  };
};

const functionEvaluators = iterateFunctionNodes((context) => {
  const checkParam = propertyEvaluator(context, 'parameter');
  const checkReturnType = returnTypeEvaluator(context);

  return (functionNode) => {
    _.forEach(functionNode.params, checkParam);
    checkReturnType(functionNode);
  };
});

// 1) type X = { foo(): A; }
// 2) type X = { foo: () => A; }
// the above have identical ASTs (save for their ranges)
// case 1 doesn't have a type annotation colon and should be ignored
const isShortPropertyFunction = (objectTypeProperty) => {
  return objectTypeProperty.value.type === 'FunctionTypeAnnotation' && objectTypeProperty.start === objectTypeProperty.value.start;
};

const objectTypePropertyEvaluator = (context) => {
  const {always} = parseOptions(context);

  const sourceCode = context.getSourceCode();

  const getColon = (objectTypeProperty) => {
    if (objectTypeProperty.optional || objectTypeProperty.static) {
      return sourceCode.getFirstToken(objectTypeProperty, 2);
    } else {
      return sourceCode.getFirstToken(objectTypeProperty, 1);
    }
  };

  return (objectTypeProperty) => {
    if (isShortPropertyFunction(objectTypeProperty)) {
      return;
    }

    const colon = getColon(objectTypeProperty);
    const typeAnnotation = sourceCode.getTokenAfter(colon);

    const spaces = typeAnnotation.start - colon.end;

    const data = {
      name: quoteName(getParameterName(objectTypeProperty, context))
    };

    if (always && spaces > 1) {
      context.report({
        data,
        fix: spacingFixers.stripSpacesAfter(colon, spaces - 1),
        message: 'There must be 1 space after {{name}}type annotation colon.',
        node: objectTypeProperty
      });
    } else if (always && spaces === 0) {
      context.report({
        data,
        fix: spacingFixers.addSpaceAfter(colon),
        message: 'There must be a space after {{name}}type annotation colon.',
        node: objectTypeProperty
      });
    } else if (!always && spaces > 0) {
      context.report({
        data,
        fix: spacingFixers.stripSpacesAfter(colon, spaces),
        message: 'There must be no space after {{name}}type annotation colon.',
        node: objectTypeProperty
      });
    }
  };
};

export default (context) => {
  return {
    ...functionEvaluators(context),
    ClassProperty: propertyEvaluator(context, 'class property'),
    ObjectTypeProperty: objectTypePropertyEvaluator(context)
  };
};
