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

export const stripSpaces = (direction, node, spaces) => {
  if (direction === 'before') {
    return stripSpacesBefore(node, spaces);
  } else {
    return stripSpacesAfter(node, spaces);
  }
};

export const addSpace = (direction, node) => {
  if (direction === 'before') {
    return addSpaceBefore(node);
  } else {
    return addSpaceAfter(node);
  }
};
