import evaluateExport from './evaluateExport';
import evaluateProgram from './evaluateProgram';

const schema = [];
const create = (context) => {
  return {
    ExportDefaultDeclaration: evaluateExport(context),
    ExportNamedDeclaration: evaluateExport(context),
    Program: evaluateProgram(context)
  };
};

export default {
  create,
  schema
};
