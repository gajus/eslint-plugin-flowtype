import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes
} from './../utilities';

export default iterateFunctionNodes((context) => {
    return (functionNode) => {
        if (!functionNode.returnType) {
            context.report(functionNode, 'Missing return type annotation.');
        }
    };
});
