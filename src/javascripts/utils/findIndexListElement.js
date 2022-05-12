const findIndexListElement = (element) => {
  const listItem = element.parentElement.querySelectAll("li");
  const currentIndex = Array.prototype.slice
    .call(listItem)
    .findIndex((listItem) => listItem === element);

  return currentIndex;
};

export default findIndexListElement;
