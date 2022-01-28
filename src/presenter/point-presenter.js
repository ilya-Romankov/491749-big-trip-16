import PointPath from '../view/point-path';
import NewPoint from '../view/new-point';
import {KeyCode} from '../constant';
import { removeOrAddKeyDown } from '../helpers/predicate';
import { remove, renderElement, replace } from '../helpers/render';
import { reOffer } from '../helpers/re-offer';
import { Mode,UserAction, UpdateType } from '../constant';

export default class PointPresenter {
  #pointElement = null;
  #newPointElement = null;
  #point = null;
  #pointContainer = null;
  #changeData = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;
  #destination = null;
  #offer = null;
  #pointModel = null;

  constructor(container, changeData, changeMode, pointModel) {
    this.#pointContainer = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#pointModel = pointModel;
  }

  init = (point) => {
    this.#point = point;
    this.#destination = this.#pointModel.distanations;
    this.#offer = reOffer(this.#pointModel.offers);

    const prevPointElement = this.#pointElement;
    const prevPointEditElement = this.#newPointElement;

    this.#pointElement = new PointPath(this.#point);
    this.#newPointElement = new NewPoint(this.#destination, this.#offer, true, this.#point);

    this.#pointElement.setStateEditPoint(() => {
      this.#switchToFormEdit();
    });

    this.#newPointElement.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointElement.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#newPointElement.setClickDefaultPoint(() => {
      this.#switchToPathPoint(this.#point);
      this.init(this.#point);
    });

    this.#newPointElement.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPointElement === null || prevPointEditElement === null) {
      return renderElement(this.#pointContainer, this.#pointElement);
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointElement, prevPointElement);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#newPointElement, prevPointEditElement);
    }

    remove(prevPointElement);
    remove(prevPointEditElement);
  }

  destroy = () => {
    remove(this.#pointElement);
    remove(this.#newPointElement);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.init(this.#point);
      this.#switchToPathPoint();
    }
  }

  #escKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      evt.preventDefault();
      this.#switchToPathPoint(this.#point);
      this.init(this.#point);
      document.removeEventListener('keydown', this.#escKeyDown);
    }
  };

  #switchToPathPoint = () => {
    replace(this.#pointElement, this.#newPointElement);
    removeOrAddKeyDown(this.#escKeyDown, false);
    this.#mode = Mode.DEFAULT;
    this.init(this.#point);
  };

  #switchToFormEdit = () => {
    replace(this.#newPointElement,this.#pointElement);
    removeOrAddKeyDown(this.#escKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #handleFormSubmit = (update) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update,
    );

    this.#switchToPathPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  }

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }
}
