import { RenderPosition } from '../constant';

export const renderElement = (container, element, place = RenderPosition.BEFORE_END) => {
  switch (place) {
    case RenderPosition.BEFORE_BEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
    case RenderPosition.AFTER_END:
      container.after(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};
