import isSimpleType from './isSimpleType';

const complexTypesWithoutWrap = new Set([
  'TupleTypeAnnotation',
  'ObjectTypeAnnotation',
]);

export default (node) => {
  return !isSimpleType(node) && !complexTypesWithoutWrap.has(node.type);
};
