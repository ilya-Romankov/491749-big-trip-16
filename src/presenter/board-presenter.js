
import Sorts from '../view/sorts';
import EventsList from '../view/eventsList';
import NoPoint from '../view/noPoints';
import { renderElement, remove } from '../helpers/render';
import PointPresenter from './point-presenter';
import PointNewPresenter from './new-point-presenter';
import { Sort } from '../helpers/sorting';
import { SortValue , UpdateType, UserAction, FilterType } from '../constant';
import {filter} from '../helpers/filter';

export default class BoardPresenter {
  #boardContainer = null;

  #sortComponent = null;
  #eventListComponent = new EventsList();
  #noPointComponent = null;

  #currentSort = SortValue.SORT_DAY;
  #boardPoints = [];
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #pointModel = null;
  #filterModel = null;
  #filterType = FilterType.ALL;

  constructor(boardContainer, boardPoints, pointModel, filterModel) {
    this.#boardPoints = [...boardPoints].sort(Sort[this.#currentSort]);
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
  }

  init = () => {
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#pointNewPresenter = new PointNewPresenter(this.#eventListComponent, this.#handleViewAction);

    this.#renderBoard();
  }

  get points () {
    this.#filterType = this.#filterModel.filter;
    const point = this.#pointModel.point;
    const filteredTasks = filter[this.#filterType](point);

    if (this.#currentSort) {
      return filteredTasks.sort(Sort[this.#currentSort]);
    }

    return filteredTasks;
  }


  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard({ resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true});
        this.#renderBoard();
        break;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  }

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }


    if (resetSortType) {
      this.#currentSort = SortValue.SORT_DAY;
    }
  }

  createPoint = () => {
    this.#currentSort = SortValue.SORT_DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#pointNewPresenter.init();
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    this.#currentSort = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }


  #renderBoard = () => {
    this.#renderElementsBoard();
  }

  #renderElementsBoard = () => {
    if (this.points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderEventList();
  }

  #renderSort = () => {
    this.#sortComponent = new Sorts(this.#currentSort);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    renderElement(this.#boardContainer, this.#sortComponent);
  }

  #renderEventList = () => {
    renderElement(this.#boardContainer,  this.#eventListComponent);
    this.points.forEach((element) => this.#renderPoint(this.#eventListComponent, element, this.#handleModeChange));
  }

  #renderPoint = (pointList ,point, changeData) => {
    const pointPresenter  = new PointPresenter(pointList, this.#handleViewAction, changeData);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id,  pointPresenter);
  }

  #renderNoPoint = () => {
    this.#noPointComponent = new NoPoint(this.#filterType);
    renderElement(this.#boardContainer, this.#noPointComponent);
  }
}
