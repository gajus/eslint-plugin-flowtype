const schema = [];

const reComponentName = /^(Pure)?Component$/;

const isReactComponent = (node) => {
  if (!node.superClass) {
    return false;
  }

  return (

    // class Foo extends Component { }
    // class Foo extends PureComponent { }
    node.superClass.type === 'Identifier' && reComponentName.test(node.superClass.name) ||

    // class Foo extends React.Component { }
    // class Foo extends React.PureComponent { }
    node.superClass.type === 'MemberExpression' &&
    (node.superClass.object.name === 'React' && reComponentName.test(node.superClass.property.name))
  );
};

const create = (context) => {
  const readOnlyTypes = [];
  const reportedFunctionalComponents = [];

  const isReadOnly = (node) => {
    return node.superTypeParameters.params[0].id &&
          node.superTypeParameters.params[0].id.name !== '$ReadOnly' &&
          !readOnlyTypes.includes(node.superTypeParameters.params[0].id.name);
  };

  // type Props = $ReadOnly<{}>
  for (const node of context.getSourceCode().ast.body) {
    if (node.type === 'TypeAlias' && node.right.id && node.right.id.name === '$ReadOnly') {
      readOnlyTypes.push(node.id.name);
    }
  }

  return {

    // class components
    ClassDeclaration (node) {
      if (isReactComponent(node) && isReadOnly(node)) {
        context.report({
          message: node.superTypeParameters.params[0].id.name + ' must be $ReadOnly',
          node
        });
      } else if (node.superTypeParameters && node.superTypeParameters.params[0].type === 'ObjectTypeAnnotation') {
        context.report({
          message: node.id.name + ' class props must be $ReadOnly',
          node
        });
      }
    },

    // functional components
    JSXElement (node) {
      let currentNode = node;
      let identifier;
      let typeAnnotation;

      while (currentNode && currentNode.type !== 'FunctionDeclaration') {
        currentNode = currentNode.parent;
      }

      // functional components can only have 1 param
      if (!currentNode || currentNode.params.length !== 1) {
        return;
      }

      if (currentNode.params[0].type === 'Identifier' &&
          (typeAnnotation = currentNode.params[0].typeAnnotation)) {
        if ((identifier = typeAnnotation.typeAnnotation.id) &&
            !readOnlyTypes.includes(identifier.name) &&
            identifier.name !== '$ReadOnly') {
          if (reportedFunctionalComponents.includes(identifier)) {
            return;
          }

          context.report({
            message: identifier.name + ' must be $ReadOnly',
            node
          });

          reportedFunctionalComponents.push(identifier);

          return;
        }

        if (typeAnnotation.typeAnnotation.type === 'ObjectTypeAnnotation') {
          context.report({
            message: currentNode.id.name + ' component props must be $ReadOnly',
            node
          });
        }
      }
    }
  };
};

export default {
  create,
  schema
};
