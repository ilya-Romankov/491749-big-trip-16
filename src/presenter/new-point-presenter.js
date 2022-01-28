import {nanoid} from 'nanoid';
import NewPoint from '../view/new-point';
import {remove, renderElement} from '../helpers/render';
import { reOffer } from '../helpers/re-offer';
import {UserAction, UpdateType, RenderPosition} from '../constant';

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #destroyCallback = null;
  #pointModel = null;
  #offers = null;
  #distanation = null;

  constructor(pointListContainer, changeData, pointModel) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#pointModel = pointModel;
    this.#offers = reOffer(this.#pointModel.offers);
    this.#distanation = this.#pointModel.distanations;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new NewPoint(this.#distanation, this.#offers, false);
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
