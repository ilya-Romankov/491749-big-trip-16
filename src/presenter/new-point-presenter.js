import {nanoid} from 'nanoid';
import NewPoint from '../view/new-point';
import {remove, renderElement} from '../helpers/render';
import { reOffer } from '../helpers/re-offer';
import {UserAction, UpdateType, RenderPosition} from '../constant';
import {destinationAll} from '../mock/pathPoint';

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #destroyCallback = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new NewPoint(destinationAll, reOffer, false);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    renderElement(this.#pointListContainer, this.#pointEditComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }


  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
