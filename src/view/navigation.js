import AbstractView from './abstract-view';
import {MenuItem} from '../constant';

const createNavigationTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" data-item="${MenuItem.POINT}" href="#">Table</a>
    <a class="trip-tabs__btn" data-item="${MenuItem.STATISTICS}" href="#">Stats</a>
  </nav>`
);

export default class Navigation extends AbstractView {
  get template() {
    return createNavigationTemplate();
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[data-item=${menuItem}]`);
    const active = this.element.querySelector('.trip-tabs__btn--active');
    active.classList.remove('trip-tabs__btn--active');
    item.classList.add('trip-tabs__btn--active');
  }

  #menuClickHandler = (evt) => {
    if (evt.target.classList.contains('trip-tabs__btn--active')) {
      return false;
    }


    if (evt.target.tagName === 'A') {
      evt.preventDefault();
      this._callback.menuClick(evt.target.dataset.item);
      this.setMenuItem(evt.target.dataset.item);
    }
  }
}
