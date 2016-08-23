export const stripSpacesAfter = (node, spaces) => {
  return (fixer) => {
    return fixer.removeRange([node.end, node.end + spaces]);
  };
};

export const addSpaceAfter = (node) => {
  return (fixer) => {
    return fixer.insertTextAfter(node, ' ');
  };
};
