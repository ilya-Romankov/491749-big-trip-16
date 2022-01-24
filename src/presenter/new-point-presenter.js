import NewPoint from '../view/new-point';
import {nanoid} from 'nanoid';
import {remove, renderElement} from '../helpers/render';
import {UserAction, UpdateType, RenderPosition} from '../constant';
import {destinationAll} from '../mock/pathPoint';
import { reOffer } from '../helpers/re-offer';


export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = () => {
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
