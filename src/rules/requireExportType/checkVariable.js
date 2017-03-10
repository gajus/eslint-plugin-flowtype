import {
    quoteName
} from './../../utilities';
import checkFunction from './checkFunction';

const checkInitializer = {
  ArrowFunctionExpression: checkFunction,
  FunctionDeclaration: checkFunction,
  Literal: () => { return true; }
};

export default function (context, variableDeclarator, finishMessage) {
  const identifierNode = variableDeclarator.id;

  const leftTypeAnnotation = identifierNode.typeAnnotation;
  const rightTypeAnnotation = variableDeclarator.init && variableDeclarator.init.typeAnnotation;

  if (leftTypeAnnotation || rightTypeAnnotation) {
    return true;
  } else {
    const initNodeType = variableDeclarator.init ? variableDeclarator.init.type : null;
    const checker = checkInitializer[initNodeType];

    if (checker) {
      return checker(context, variableDeclarator.init, finishMessage);
    } else {
      const identifierName = identifierNode.name;

      context.report({
        data: {
          name: quoteName(identifierName)
        },
        message: finishMessage('Missing {{name}}type annotation'),
        node: identifierNode
      });

      return false;
    }
  }
}
