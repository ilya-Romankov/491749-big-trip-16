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

  #boardPoint = [];
  #pointPresenter = new Map();


  constructor(boardContainer, filterContainer) {
    this.#boardContainer = boardContainer;
    this.#filterContainer = filterContainer;
  }

  init = (boardPoint) => {
    this.#boardPoint = [...boardPoint];
    this.#renderBoard();
  }

  #renderBoard = () => {
    this.#renderBoardPoint();
  }

  #renderBoardPoint = () => {
    if (this.#boardPoint.length === 0) {
      return this.#renderNoPoint();
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

    this.#boardPoint.forEach((element) => this.#renderPoint(this.#eventListComponent, element));
  }

  #renderPoint = (pointList ,point) => {
    const pointPresenter  = new PointPresenter(pointList, this.#handlePointChange);
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
    this.#boardPoint = updateItem(this.#boardPoint, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

}
