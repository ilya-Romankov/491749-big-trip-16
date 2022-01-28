import AbstractView from './abstract';

const createLoadingTemplate = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}