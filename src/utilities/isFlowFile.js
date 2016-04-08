
export default (context) => {
    const sourceCode = context.getSourceCode();
    const firstComment = (context.getAllComments() || [])[0];
    return firstComment && firstComment.value.indexOf('@flow') != -1;
};
