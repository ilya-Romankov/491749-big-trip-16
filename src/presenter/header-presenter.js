import Header from '../view/header';
import {remove, renderElement} from '../helpers/render';
import {RenderPosition} from '../constant';

export default class HeaderPresenter {
  #pointModel = null;
  #headerView = null;
  #headerContainer = null;

  constructor(pointModel, headerContainer) {
    this.#pointModel = pointModel;
    this.#headerContainer = headerContainer;
  }

  init = () => {
    if (this.#pointModel.point.length === 0) {
      return;
    }

    if (this.#headerView !== null) {
      remove(this.#headerView);
    }

    this.#headerView = new Header(this.#pointModel.point);
    this.#renderHeader();
  }

  #renderHeader = () => {
    renderElement(this.#headerContainer, this.#headerView, RenderPosition.AFTER_BEGIN);
  }
}
