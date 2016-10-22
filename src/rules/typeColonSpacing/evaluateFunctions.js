import _ from 'lodash';
import {iterateFunctionNodes} from '../../utilities';
import evaluateTypical from './evaluateTypical';
import evaluateReturnType from './evaluateReturnType';

export default iterateFunctionNodes((context, report) => {
  const checkParam = evaluateTypical(context, report, 'parameter');
  const checkReturnType = evaluateReturnType(context, report);

  return (functionNode) => {
    _.forEach(functionNode.params, checkParam);
    checkReturnType(functionNode);
  };
});
