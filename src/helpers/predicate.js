export const isChildClass = (childClass, parentClass) => childClass instanceof parentClass;

export const removeOrAddKeyDown = (callback, flag = true) => {
  if (flag) {
    return document.addEventListener('keydown', callback);
  }

  document.removeEventListener('keydown', callback);
};
