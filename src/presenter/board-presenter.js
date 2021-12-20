import FilterSection from '../view/filter';
import Sort from '../view/sort';
import EventsList from '../view/eventsList';
import NoPoint from '../view/noPoints';
import { renderElement } from '../helpers/render';
import { updateItem } from '../helpers/random';
import PointPresenter from './point-presenter';

export default class BoardPresenter {
  #boardContainer = null;
  #filterContainer = null;

  #sortComponent = new Sort();
  #eventListComponent = new EventsList();
  #noPointComponent = new NoPoint();
  #filterElement = new FilterSection();

  #boardPoints = [];
  #pointPresenter = new Map();


  constructor(boardContainer, filterContainer, boardPoints) {
    this.#boardPoints = [...boardPoints];
    this.#boardContainer = boardContainer;
    this.#filterContainer = filterContainer;
  }

  init = () => {
    this.#renderBoard();
  }

  #renderBoard = () => {
    this.#renderElementsBoard();
  }

  #renderElementsBoard = () => {
    if (this.#boardPoints.length === 0) {
      this.#renderFilter();
      this.#renderNoPoint();
      return;
    }

    this.#renderFilter();
    this.#renderSort();
    this.#renderEventList();
  }

  #renderFilter = () => {
    renderElement(this.#filterContainer, this.#filterElement);
  }

  #renderSort = () => {
    renderElement(this.#boardContainer, this.#sortComponent);
  }

  #renderEventList = () => {
    renderElement(this.#boardContainer,  this.#eventListComponent);

    this.#boardPoints.forEach((element) => this.#renderPoint(this.#eventListComponent, element, this.#handleModeChange));
  }

  #renderPoint = (pointList ,point, changeData) => {
    const pointPresenter  = new PointPresenter(pointList, this.#handlePointChange, changeData);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id,  pointPresenter);
  }

  #renderNoPoint = () => {
    renderElement(this.#boardContainer, this.#noPointComponent);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

}
