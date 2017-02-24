const FLOW_MATCHER = /@(no)?flow( weak)?/;

export default (comment) => {
  const match = comment.match(FLOW_MATCHER);

  if (!match) {
    return null;
  } else if (match[1]) {
    return 'noflow';
  } else if (match[2]) {
    return 'flow weak';
  } else {
    return 'flow';
  }
};
