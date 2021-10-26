import {
  iterateFunctionNodes,
} from '../../utilities';
import evaluateReturnType from './evaluateReturnType';
import evaluateTypical from './evaluateTypical';

export default iterateFunctionNodes((context, report) => {
  const checkParam = evaluateTypical(context, report, 'parameter');
  const checkReturnType = evaluateReturnType(context, report);

  return (functionNode) => {
    for (const param of functionNode.params) {
      checkParam(param);
    }

    checkReturnType(functionNode);
  };
});
