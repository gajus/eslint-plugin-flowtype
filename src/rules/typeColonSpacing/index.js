import evaluateFunctions from './evaluateFunctions';
import evaluateObjectTypeIndexer from './evaluateObjectTypeIndexer';
import evaluateObjectTypeProperty from './evaluateObjectTypeProperty';
import evaluateTypeCastExpression from './evaluateTypeCastExpression';
import evaluateTypical from './evaluateTypical';
import evaluateVariables from './evaluateVariables';
import reporter from './reporter';

export default (direction, context, options) => {
  const report = reporter(direction, context, options);

  return {
    ...evaluateFunctions(context, report),
    ClassProperty: evaluateTypical(context, report, 'class property'),
    ObjectTypeIndexer: evaluateObjectTypeIndexer(context, report),
    ObjectTypeProperty: evaluateObjectTypeProperty(context, report),
    TypeCastExpression: evaluateTypeCastExpression(context, report),
    VariableDeclaration: evaluateVariables(context, report),
  };
};
