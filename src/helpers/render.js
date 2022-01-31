import AbstractView from '../view/abstract-view';
import { isChildClass } from './predicate';
import { RenderPosition } from '../constant';


export const renderElement = (container, element, place = RenderPosition.BEFORE_END) => {
  const parent = isChildClass(container, AbstractView)  ? container.element : container;
  const child = isChildClass(element, AbstractView) ? element.element : element;

  parent[place](child);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const newChild = isChildClass(newElement, AbstractView) ? newElement.element : newElement;
  const oldChild = isChildClass(oldElement, AbstractView) ? oldElement.element : oldElement;

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};
