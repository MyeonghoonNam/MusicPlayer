const removeAllChildNodes = (parent) => {
  const firstChild = parent.firstChild;

  while (firstChild) {
    parent.removeChild(firstChild);
  }
};

export default removeAllChildNodes;
