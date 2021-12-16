export const isChildClass = (childClass, parentClass) => childClass instanceof parentClass;

//Чтобы напрямую не взаимодействовать в интерфесе класса с DOM. Если устроит , то я все события пользователя перенесу в что-то подобное
export const removeOrAddKeyDown = (callback, flag = true) => {
  if (flag) {
    return document.addEventListener('keydown', callback);
  }

  document.removeEventListener('keydown', callback);
};
