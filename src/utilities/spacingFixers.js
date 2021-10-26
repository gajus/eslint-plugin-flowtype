export const stripSpacesBefore = (node, spaces) => {
  return (fixer) => {
    return fixer.removeRange([node.range[0] - spaces, node.range[0]]);
  };
};

export const stripSpacesAfter = (node, spaces) => {
  return (fixer) => {
    return fixer.removeRange([node.range[1], node.range[1] + spaces]);
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

export const replaceWithSpaceBefore = (node, spaces) => {
  return (fixer) => {
    return fixer.replaceTextRange([node.range[0] - spaces, node.range[0]], ' ');
  };
};

export const replaceWithSpaceAfter = (node, spaces) => {
  return (fixer) => {
    return fixer.replaceTextRange([node.range[1], node.range[1] + spaces], ' ');
  };
};

export const stripSpaces = (direction, node, spaces) => {
  if (direction === 'before') {
    return stripSpacesBefore(node, spaces);
  }

  return stripSpacesAfter(node, spaces);
};

export const addSpace = (direction, node) => {
  if (direction === 'before') {
    return addSpaceBefore(node);
  }

  return addSpaceAfter(node);
};

export const replaceWithSpace = (direction, node, spaces) => {
  if (direction === 'before') {
    return replaceWithSpaceBefore(node, spaces);
  }

  return replaceWithSpaceAfter(node, spaces);
};
