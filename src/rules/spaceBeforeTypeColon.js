import _ from 'lodash';
import {
    getParameterName,
    iterateFunctionNodes
} from './../utilities';

const functionEvaluators = iterateFunctionNodes((context) => {
    const always = context.options[0] === 'always';

    const sourceCode = context.getSourceCode();

    return (functionNode) => {
        _.forEach(functionNode.params, (identifierNode) => {
            const parameterName = getParameterName(identifierNode, context);
            const typeAnnotation = _.get(identifierNode, 'typeAnnotation') || _.get(identifierNode, 'left.typeAnnotation');

            if (typeAnnotation) {
                // usually the identifierNode, but can be the closing } of a destructuring
                // so foo: string
                //    ^^^ tokenBeforeType
                //       ^^^^^^^^ typeAnnotation
                // so { bar }: Object
                //    ^^^^^^^ tokenBeforeType
                //           ^^^^^^^^ typeAnnotation
                const tokenBeforeType = sourceCode.getTokenBefore(typeAnnotation, identifierNode.optional ? 1 : 0);
                const spaceBefore = typeAnnotation.start - tokenBeforeType.end - (identifierNode.optional ? 1 : 0);

                if (always && spaceBefore > 1) {
                    context.report(identifierNode, 'There must be 1 space before "' + parameterName + '" parameter type annotation colon.');
                } else if (always && spaceBefore === 0) {
                    context.report(identifierNode, 'There must be a space before "' + parameterName + '" parameter type annotation colon.');
                } else if (!always && spaceBefore > 0) {
                    context.report(identifierNode, 'There must be no space before "' + parameterName + '" parameter type annotation colon.');
                }
            }
        });
    };
});

const objectTypePropertyEvaluator = (context) => {
    const always = context.options[0] === 'always';

    const sourceCode = context.getSourceCode();

    return (objectTypeProperty) => {
        // so foo: string
        //    ^^^ identifier
        //    ^^^ tokenBeforeColon
        //       ^ colon
        // so foo?: string
        //    ^^^ identifier
        //       ^ tokenBeforeColon
        //        ^ colon
        const identifier = sourceCode.getFirstToken(objectTypeProperty);
        const tokenBeforeColon = sourceCode.getFirstToken(objectTypeProperty, objectTypeProperty.optional ? 1 : 0);
        const colon = sourceCode.getFirstToken(objectTypeProperty, objectTypeProperty.optional ? 2 : 1);

        const name = identifier.value;

        const spaceBefore = colon.start - tokenBeforeColon.end;

        if (always && spaceBefore > 1) {
            context.report(objectTypeProperty, 'There must be 1 space before "' + name + '" type annotation colon.');
        } else if (always && spaceBefore === 0) {
            context.report(objectTypeProperty, 'There must be a space before "' + name + '" type annotation colon.');
        } else if (!always && spaceBefore > 0) {
            context.report(objectTypeProperty, 'There must be no space before "' + name + '" type annotation colon.');
        }
    };
};

export default (context) => {
    return {
        ...functionEvaluators(context),
        ObjectTypeProperty: objectTypePropertyEvaluator(context)
    };
};
