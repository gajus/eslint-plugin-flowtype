import _ from 'lodash';

const schema = [
  {
    enum: [
      'always',
      'never',
    ],
    type: 'string',
  },
  {
    additionalProperties: false,
    properties: {
      annotateUndefined: {
        enum: ['always', 'never', 'ignore', 'always-enforce'],
        type: 'string',
      },
      excludeArrowFunctions: {
        enum: [false, true, 'expressionsOnly'],
      },
      excludeMatching: {
        items: {
          type: 'string',
        },
        type: 'array',
      },
      includeOnlyMatching: {
        items: {
          type: 'string',
        },
        type: 'array',
      },
    },
    type: 'object',
  },
];

const makeRegExp = (str) => {
  return new RegExp(str, 'u');
};

const isUndefinedReturnType = (returnNode) => {
  return returnNode.argument === null || returnNode.argument.name === 'undefined' || returnNode.argument.operator === 'void';
};

const create = (context) => {
  const annotateReturn = (_.get(context, 'options[0]') || 'always') === 'always';
  const annotateUndefined = _.get(context, 'options[1].annotateUndefined') || 'never';
  const skipArrows = _.get(context, 'options[1].excludeArrowFunctions') || false;

  // eslint-disable-next-line unicorn/no-array-callback-reference
  const excludeMatching = _.get(context, 'options[1].excludeMatching', []).map(makeRegExp);
  // eslint-disable-next-line unicorn/no-array-callback-reference
  const includeOnlyMatching = _.get(context, 'options[1].includeOnlyMatching', []).map(makeRegExp);

  const targetNodes = [];

  const registerFunction = (functionNode) => {
    targetNodes.push({
      functionNode,
    });
  };

  const getIsReturnTypeAnnotationUndefined = (targetNode) => {
    const isReturnTypeAnnotationLiteralUndefined = _.get(targetNode, 'functionNode.returnType.typeAnnotation.id.name') === 'undefined' &&
      _.get(targetNode, 'functionNode.returnType.typeAnnotation.type') === 'GenericTypeAnnotation';
    const isReturnTypeAnnotationVoid = _.get(targetNode, 'functionNode.returnType.typeAnnotation.type') === 'VoidTypeAnnotation';
    const isAsyncReturnTypeAnnotationVoid = _.get(targetNode, 'functionNode.async') &&
      _.get(targetNode, 'functionNode.returnType.typeAnnotation.id.name') === 'Promise' && (
      _.get(targetNode, 'functionNode.returnType.typeAnnotation.typeParameters.params[0].type') === 'VoidTypeAnnotation' ||
      _.get(targetNode, 'functionNode.returnType.typeAnnotation.typeParameters.params[0].id.name') === 'undefined' &&
      _.get(targetNode, 'functionNode.returnType.typeAnnotation.typeParameters.params[0].type') === 'GenericTypeAnnotation'
    );

    return isReturnTypeAnnotationLiteralUndefined || isReturnTypeAnnotationVoid || isAsyncReturnTypeAnnotationVoid;
  };

  const shouldFilterNode = (functionNode) => {
    const isArrow = functionNode.type === 'ArrowFunctionExpression';
    const isMethod = functionNode.parent && functionNode.parent.type === 'MethodDefinition';
    const propertyNodes = ['Property', 'ClassProperty'];
    const isProperty = functionNode.parent && propertyNodes.includes(functionNode.parent.type);
    let selector;

    if (isMethod || isProperty) {
      selector = 'parent.key.name';
    } else if (isArrow) {
      selector = 'parent.id.name';
    } else {
      selector = 'id.name';
    }

    const identifierName = _.get(functionNode, selector);

    const checkRegExp = (regex) => {
      return regex.test(identifierName);
    };

    if (excludeMatching.length && _.some(excludeMatching, checkRegExp)) {
      return true;
    }

    if (includeOnlyMatching.length && !_.some(includeOnlyMatching, checkRegExp)) {
      return true;
    }

    return false;
  };

  // eslint-disable-next-line complexity
  const evaluateFunction = (functionNode) => {
    const targetNode = targetNodes.pop();

    if (functionNode !== targetNode.functionNode) {
      throw new Error('Mismatch.');
    }

    const isArrow = functionNode.type === 'ArrowFunctionExpression';
    const isArrowFunctionExpression = functionNode.expression;
    const isFunctionReturnUndefined =
      !isArrowFunctionExpression &&
      !functionNode.generator &&
      (!targetNode.returnStatementNode || isUndefinedReturnType(targetNode.returnStatementNode));
    const isReturnTypeAnnotationUndefined = getIsReturnTypeAnnotationUndefined(targetNode);

    if (skipArrows === 'expressionsOnly' && isArrowFunctionExpression || skipArrows === true && isArrow || shouldFilterNode(functionNode)) {
      return;
    }

    const returnType = functionNode.returnType || isArrow && _.get(functionNode, 'parent.id.typeAnnotation');

    if (isFunctionReturnUndefined && isReturnTypeAnnotationUndefined && annotateUndefined === 'never') {
      context.report({message: 'Must not annotate undefined return type.', node: functionNode});
    } else if (isFunctionReturnUndefined && !isReturnTypeAnnotationUndefined && annotateUndefined === 'always') {
      context.report({message: 'Must annotate undefined return type.', node: functionNode});
    } else if (
      (annotateUndefined === 'always-enforce' || !isFunctionReturnUndefined && !isReturnTypeAnnotationUndefined) &&
        annotateReturn && !returnType && !shouldFilterNode(functionNode)
    ) {
      context.report({message: 'Missing return type annotation.', node: functionNode});
    }
  };

  const evaluateNoise = () => {
    targetNodes.pop();
  };

  return {
    ArrowFunctionExpression: registerFunction,
    'ArrowFunctionExpression:exit': evaluateFunction,
    ClassDeclaration: registerFunction,
    'ClassDeclaration:exit': evaluateNoise,
    ClassExpression: registerFunction,
    'ClassExpression:exit': evaluateNoise,
    FunctionDeclaration: registerFunction,
    'FunctionDeclaration:exit': evaluateFunction,
    FunctionExpression: registerFunction,
    'FunctionExpression:exit': evaluateFunction,
    ReturnStatement: (node) => {
      if (targetNodes.length) {
        targetNodes[targetNodes.length - 1].returnStatementNode = node;
      }
    },
  };
};

export default {
  create,
  schema,
};
