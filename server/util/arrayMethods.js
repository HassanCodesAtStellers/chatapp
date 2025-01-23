export const removeElementDuplications = (arr) => {
  const elementCount = new Map();
  const result = [];

  for (const element of arr) {
    elementCount.set(element, (elementCount.get(element) || 0) + 1);

    if (elementCount.get(element) === 1) {
      result.push(element);
    }
  }

  return result;
};
