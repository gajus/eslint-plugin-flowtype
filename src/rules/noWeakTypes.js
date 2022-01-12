import _ from 'lodash';

const schema = [
  {
    additionalProperties: false,
    properties: {
      '*': {
        type: 'boolean',
      },
      any: {
        type: 'boolean',
      },
      Function: {
        type: 'boolean',
      },
      Object: {
        type: 'boolean',
      },
    },
    type: 'object',
  },
];

const reportWeakType = (context, weakType) => {
  return (node) => {
    context.report({
      data: {weakType},
      message: 'Unexpected use of weak type "{{weakType}}"',
      node,
    });
  };
};

const genericTypeEvaluator = (context, {checkFunction, checkObject}) => {
  return (node) => {
    const name = _.get(node, 'id.name');

    if (checkFunction && name === 'Function' || checkObject && name === 'Object') {
      reportWeakType(context, name)(node);
    }
  };
};

const create = (context) => {
  const checkAny = _.get(context, 'options[0].any', true) === true;
  const checkExists = _.get(context, 'options[0].*', true) === true;
  const checkFunction = _.get(context, 'options[0].Function', true) === true;
  const checkObject = _.get(context, 'options[0].Object', true) === true;

  const checks = {};

  if (checkAny) {
    checks.AnyTypeAnnotation = reportWeakType(context, 'any');
  }

  if (checkExists) {
    checks.ExistsTypeAnnotation = reportWeakType(context, '*');
  }

  if (checkFunction || checkObject) {
    checks.GenericTypeAnnotation = genericTypeEvaluator(context, {
      checkFunction,
      checkObject,
    });
  }

  return checks;
};

export default {
  create,
  schema,
};
