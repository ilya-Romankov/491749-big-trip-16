import { RenderPosition } from '../constant';

export const renderTemplate = (container, template, place = RenderPosition.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};
