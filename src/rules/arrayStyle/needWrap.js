import isSimpleType from './isSimpleType';

const complexTypesWithoutWrap = ['TupleTypeAnnotation', 'ObjectTypeAnnotation'];

export default (node) => {
  return !isSimpleType(node) && complexTypesWithoutWrap.indexOf(node.type) === -1;
};
