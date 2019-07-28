import {getParameterName, quoteName} from '../../utilities';

const getColon = (context, objectTypeProperty) => {
  // eslint-disable-next-line init-declarations
  let tokenIndex = 1;

  if (objectTypeProperty.optional) {
    tokenIndex++;
  }

  if (objectTypeProperty.static) {
    tokenIndex++;
  }

  if (objectTypeProperty.variance) {
    tokenIndex++;
  }

  return context.getSourceCode().getFirstToken(objectTypeProperty, tokenIndex);
};

// 1) type X = { foo(): A; }
// 2) type X = { foo: () => A; }
// the above have identical ASTs (save for their ranges)
// case 1 doesn't have a type annotation colon and should be ignored
const isShortPropertyFunction = (objectTypeProperty) => {
  return objectTypeProperty.value.type === 'FunctionTypeAnnotation' && objectTypeProperty.start === objectTypeProperty.value.start;
};

export default (context, report) => {
  return (objectTypeProperty) => {
    if (isShortPropertyFunction(objectTypeProperty)) {
      // potential difference: not checked in before
      return;
    }

    report({
      colon: getColon(context, objectTypeProperty),
      name: quoteName(getParameterName(objectTypeProperty, context)),
      node: objectTypeProperty,
    });
  };
};
