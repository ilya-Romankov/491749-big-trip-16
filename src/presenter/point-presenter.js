import PointPath from '../view/pointPath';
import NewPoint from '../view/newPoint';
import {KeyCode} from '../constant';
import { removeOrAddKeyDown } from '../helpers/predicate';
import { remove, renderElement, replace } from '../helpers/render';
import { Mode } from '../constant';

export default class PointPresenter {
  #pointElement = null;
  #newPointElement = null;
  #point = null;
  #pointContainer = null;
  #changeData = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;

  constructor(container, changeData, changeMode) {
    this.#pointContainer = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointElement = this.#pointElement;
    const prevPointEditElement = this.#newPointElement;

    this.#pointElement = new PointPath(this.#point);
    this.#newPointElement = new NewPoint(this.#point);

    this.#pointElement.setStateEditPoint(() => {
      this.#switchToFormEdit();
    });

    this.#pointElement.setFavoriteClickHandler(() => {
      this.#handleFavoriteClick();
    });

    this.#newPointElement.setClickDefaultPoint(() => {
      this.#switchToPathPoint();
    });

    this.#newPointElement.setSubmitDefaultPoint(() => {
      this.#switchToPathPoint();
    });

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
      this.#switchToPathPoint();
    }
  }

  #escKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      evt.preventDefault();
      this.#switchToPathPoint();
      document.removeEventListener('keydown', this.#escKeyDown);
    }
  };

  #switchToPathPoint = () => {
    replace(this.#pointElement, this.#newPointElement);
    removeOrAddKeyDown(this.#escKeyDown, false);
    this.#mode = Mode.DEFAULT;
  };

  #switchToFormEdit = () => {
    replace(this.#newPointElement,this.#pointElement);
    removeOrAddKeyDown(this.#escKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }
}
