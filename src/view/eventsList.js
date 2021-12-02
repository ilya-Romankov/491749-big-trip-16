import { createElement } from '../helpers/render';

const createEventListTemplate = () => (
  '<ul class="trip-events__list"><ul/>'
);

export default class EventsList {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEventListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
