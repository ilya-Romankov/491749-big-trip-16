import PointPath from '../view/pointPath';
import NewPoint from '../view/newPoint';
import {KeyCode} from '../constant';
import { removeOrAddKeyDown } from '../helpers/predicate';
import {remove, renderElement, replace} from '../helpers/render';

export default class PointPresenter {
  #pointElement = null;
  #newPointElement = null;
  #point = null;
  #pointContainer = null;
  #stateOpenComponent = null;
  #stateCloseComponent = null;
  #changeData = null;

  constructor(container, changeData) {
    this.#pointContainer = container;
    this.#changeData = changeData;
  }

  init = (point) => {
    this.#point = point;

    const prevPointElement = this.#pointElement;
    const prevPointEditElement = this.#newPointElement;

    this.#pointElement = new PointPath(this.#point);
    this.#newPointElement = new NewPoint(this.#point);

    this.#pointElement.setStateEditPoint(() => {
      this.#switchToFormEdit();
      removeOrAddKeyDown(this.#escKeyDown);
    });

    this.#pointElement.setFavoriteClickHandler(() => {
      this.#handleFavoriteClick();
    });

    this.#newPointElement.setClickDefaultPoint(() => {
      this.#switchToPathPoint();
      removeOrAddKeyDown(this.#escKeyDown, false);
    });

    this.#newPointElement.setSubmitDefaultPoint(() => {
      this.#switchToPathPoint();
      removeOrAddKeyDown(this.#escKeyDown, false);
    });


    if (prevPointElement === null || prevPointEditElement === null) {
      return renderElement(this.#pointContainer, this.#pointElement);
    }

    if (this.#pointContainer.element.contains(prevPointElement.element)) {
      replace(this.#pointElement, prevPointElement);
    }

    if (this.#pointContainer.element.contains(prevPointEditElement.element)) {
      replace(this.#newPointElement, prevPointEditElement);
    }

    remove(prevPointElement);
    remove(prevPointEditElement);
  }

  destroy = () => {
    remove(this.#pointElement);
    remove(this.#newPointElement);
  }

  #escKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      evt.preventDefault();
      replace(this.#pointElement, this.#newPointElement);
      this.#stateOpenComponent = this.#stateCloseComponent = null;
      document.removeEventListener('keydown', this.#escKeyDown);
    }
  };

  #switchToPathPoint = () => {
    replace(this.#pointElement, this.#newPointElement);
    this.#stateOpenComponent = this.#stateCloseComponent = null;
  };

  #reWriteState = () => {
    this.#stateOpenComponent = this.#newPointElement;
    this.#stateCloseComponent = this.#pointElement;
  };

  #switchToFormEdit = () => {
    if (this.#stateOpenComponent === null) {
      this.#reWriteState();
      return replace(this.#newPointElement, this.#pointElement);
    }

    replace(this.#stateCloseComponent, this.#stateOpenComponent);
    this.#reWriteState();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }
}
