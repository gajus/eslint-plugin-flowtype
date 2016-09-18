export const stripSpacesBefore = (node, spaces) => {
  return (fixer) => {
    return fixer.removeRange([node.start - spaces, node.start]);
  };
};

export const stripSpacesAfter = (node, spaces) => {
  return (fixer) => {
    return fixer.removeRange([node.end, node.end + spaces]);
  };
};

export const addSpaceBefore = (node) => {
  return (fixer) => {
    return fixer.insertTextBefore(node, ' ');
  };
};

export const addSpaceAfter = (node) => {
  return (fixer) => {
    return fixer.insertTextAfter(node, ' ');
  };
};
