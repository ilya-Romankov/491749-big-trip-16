import AbstractView from './abstract-view';

const createEventListTemplate = () => (
  '<ul class="trip-events__list"><ul/>'
);

export default class EventsList extends AbstractView {
  get template() {
    return createEventListTemplate();
  }
}
