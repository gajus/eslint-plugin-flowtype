import _ from 'lodash';
import {
    getParameterName,
    quoteName
} from './../../utilities';

export default function (context, functionDeclaration, finishMessage) {
  let valid;

  valid = true;
  if (!functionDeclaration.returnType) {
    context.report(
      functionDeclaration,
      finishMessage('Missing return type annotation')
    );
    valid = false;
  }

  _.forEach(functionDeclaration.params, (identifierNode) => {
    const parameterName = getParameterName(identifierNode, context);

    const typeAnnotation = _.get(identifierNode, 'typeAnnotation') || _.get(identifierNode, 'left.typeAnnotation');

    if (!typeAnnotation) {
      context.report({
        data: {
          name: quoteName(parameterName)
        },
        message: finishMessage('Missing {{name}}parameter type annotation'),
        node: identifierNode
      });

      valid = false;
    }
  });

  return valid;
}
