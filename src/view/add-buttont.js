import {MenuItem} from '../constant';
import AbstractView from './abstract';

const createAddButtonPointTemplate = () => (
  `<button class ="trip-main__event-add-btn btn btn--big btn--yellow" type ="button" data-item="${MenuItem.ADD_NEW_POINT}">
       New event
   </button>`
);

export default class AddButton extends AbstractView {
  get template() {
    return createAddButtonPointTemplate();
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  setMenuItem = () => {
    const menuPoint = document.querySelector('[data-item=\'POINT\']');
    const menuStat = document.querySelector('[data-item=\'STATISTICS\']');

    if(!menuPoint.classList.contains('trip-tabs__btn--active')) {
      menuPoint.classList.add('trip-tabs__btn--active');
    }
    menuStat.classList.remove('trip-tabs__btn--active');

  }

  #menuClickHandler = (evt) => {
    if (evt.target.classList.contains('trip-tabs__btn--active')) {
      return false;
    }


    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.item);
    this.setMenuItem(evt.target.dataset.item);

  }
}
