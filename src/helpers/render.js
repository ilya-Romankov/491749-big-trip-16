import { RenderPosition } from '../constant';

export const renderElement = (container, element, place = RenderPosition.BEFORE_END) => {
  container[place](element);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};
