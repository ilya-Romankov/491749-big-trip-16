import PointPresenter from './point-presenter';
import PointNewPresenter from './new-point-presenter';
import Sorts from '../view/sorts';
import EventsList from '../view/eventsList';
import NoPoint from '../view/no-points';
import LoadingView from '../view/loading';
import { renderElement, remove } from '../helpers/render';
import {filter} from '../helpers/filter';
import { Sort } from '../helpers/sorting';
import {SortValue, UpdateType, UserAction, FilterType, RenderPosition} from '../constant';


export default class BoardPresenter {
  #boardContainer = null;

  #sortComponent = null;
  #eventListComponent = new EventsList();
  #noPointComponent = null;

  #currentSort = SortValue.SORT_DAY;
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #pointModel = null;
  #filterModel = null;
  #filterType = FilterType.ALL;
  #loadingComponent = new LoadingView()
  #isLoading = true;

  constructor(boardContainer, pointModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
  }

  init = () => {
    this.#pointNewPresenter = new PointNewPresenter(this.#eventListComponent, this.#handleViewAction, this.#pointModel);
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderBoard();
  }

  get points () {
    this.#filterType = this.#filterModel.filter;
    const point = this.#pointModel.point;
    const filteredTasks = filter[this.#filterType](point);

    return this.#currentSort ? filteredTasks.sort(Sort[this.#currentSort]) : filteredTasks;
  }

  createPoint = (callback) => {
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
      this.#renderEventList();
    }

    this.#pointNewPresenter.init(callback);
  }

  destroy = () => {
    this.#clearBoard({resetSortType: true});

    remove(this.#eventListComponent);

    this.#pointModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);

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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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


  #renderBoard = () => {
    this.#renderElementsBoard();
  }

  #renderElementsBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderEventList();
  }

  #renderSort = () => {
    this.#sortComponent = new Sorts(this.#currentSort);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    renderElement(this.#boardContainer, this.#sortComponent, RenderPosition.AFTER_BEGIN);
  }

  #renderEventList = () => {
    renderElement(this.#boardContainer,  this.#eventListComponent);
    this.points.forEach((element) => this.#renderPoint(this.#eventListComponent, element, this.#handleModeChange));
  }

  #renderPoint = (pointList ,point, changeData) => {
    const pointPresenter  = new PointPresenter(pointList, this.#handleViewAction, changeData, this.#pointModel);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id,  pointPresenter);
  }

  #renderLoading = () => {
    renderElement(this.#boardContainer, this.#loadingComponent);
  }

  #renderNoPoint = () => {
    this.#noPointComponent = new NoPoint(this.#filterType);
    renderElement(this.#boardContainer, this.#noPointComponent);
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
}
