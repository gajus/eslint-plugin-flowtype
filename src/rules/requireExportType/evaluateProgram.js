import _ from 'lodash';
import {quoteName} from './../../utilities';
import checkFunction from './checkFunction';
import checkVariable from './checkVariable';

const getLocalNames = (node) => {
  if (node.type === 'ExportNamedDeclaration') {
    return node.specifiers.map((specifier) => {
      return [specifier.local.name, specifier];
    });
  } else if (node.type === 'ExportDefaultDeclaration') {
    if (node.declaration.type === 'Identifier') {
      return [[node.declaration.name, node.declaration]];
    } else {
      return [];
    }
  } else {
    return [];
  }
};

const requiredBelow = (prefix) => {
  return prefix + ', required by export below.';
};

const reportExport = function (context, specifier, priorLine) {
  context.report({
    data: {
      name: quoteName(specifier.name || specifier.local.name),
      priorLine
    },
    message: 'Missing or incomplete type annotation on prior {{name}}declaration at line {{priorLine}}.',
    node: specifier
  });
};

export default function (context) {
  return (programNode) => {
    const nodePairs = programNode.body.map(getLocalNames);
    const exportMap = new Map(_.flatten(nodePairs));

    programNode.body.forEach((node) => {
      if (node.type === 'VariableDeclaration') {
        node.declarations.forEach((declarator) => {
          const name = declarator.id.name;
          const specifier = exportMap.get(name);

          if (specifier) {
            if (!checkVariable(context, declarator, requiredBelow)) {
              reportExport(context, specifier, node.loc.start.line);
            }
          }
        });
      } else if (node.type === 'FunctionDeclaration') {
        const name = node.id ? node.id.name : null;
        const specifier = exportMap.get(name);

        if (specifier && !checkFunction(context, node, requiredBelow)) {
          reportExport(context, specifier, node.loc.start.line);
        }
      }
    });
  };
}
