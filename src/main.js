import Navigation from './view/navigation';
import FilterSection from './view/filter';
import Path from './view/path';
import Sort from './view/sort';
import EventsList from './view/eventsList';
import PointPath from './view/pointPath';
import NewPoint from './view/newPoint';
import NoPoint from './view/noPoints';
import { renderElement } from './helpers/render';
import { POINT_COUNT, RenderPosition, KeyCode } from './constant';
import { generatePoint } from './mock/pathPoint';


const points = Array.from({length: POINT_COUNT}, generatePoint);

const body = document.querySelector('.page-body');

const sitePathElement = body.querySelector('.trip-main');
const path = new Path();

renderElement(sitePathElement, path.element, RenderPosition.AFTER_BEGIN);

const siteNavigationElement = body.querySelector('.trip-controls__navigation');
const navigation = new Navigation();

renderElement(siteNavigationElement, navigation.element);

const filterSection =  new FilterSection();
const siteFiltersElement = body.querySelector('.trip-controls__filters');

renderElement(siteFiltersElement, filterSection.element);

const siteBoard = body.querySelector('.trip-events');

let stateOpenComponent = null;
let stateCloseComponent = null;

const renderPoint = (pointList, point) => {
  const pointElement = new PointPath(point);
  const newPointElement = new NewPoint(point);
  const btnOpenEdit = pointElement.element.querySelector('.event__rollup-btn');
  const btnCloseEdit = newPointElement.element.querySelector('.event__reset-btn');
  const arrowCloseEdit = newPointElement.element.querySelector('.event__rollup-btn');
  const form  = newPointElement.element.querySelector('.event--edit');

  const escKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      evt.preventDefault();
      pointList.replaceChild(pointElement.element, newPointElement.element);
      stateOpenComponent = null;
      stateCloseComponent = null;
      document.removeEventListener('keydown', escKeyDown);
    }
  };

  const switchToPathPoint = (evt) => {
    evt.preventDefault();
    pointList.replaceChild(pointElement.element, newPointElement.element);
    document.removeEventListener('keydown', escKeyDown);
    stateOpenComponent = null;
    stateCloseComponent = null;
  };

  const switchToFormEdit = () => {
    if (stateOpenComponent === null) {
      stateOpenComponent = newPointElement.element;
      stateCloseComponent = pointElement.element;
    } else {
      pointList.replaceChild(stateCloseComponent, stateOpenComponent);
      stateOpenComponent = newPointElement.element;
      stateCloseComponent = pointElement.element;
    }

    pointList.replaceChild(newPointElement.element, pointElement.element);
    document.addEventListener('keydown', escKeyDown);
  };


  btnOpenEdit.addEventListener('click', switchToFormEdit);

  form.addEventListener('submit', switchToPathPoint);

  btnCloseEdit.addEventListener('click', switchToPathPoint);

  if (arrowCloseEdit) {
    arrowCloseEdit.addEventListener('click', switchToPathPoint);
  }

  renderElement(pointList, pointElement.element);
};

const renderBoard = (board, arr) => {
  const listComponent = new EventsList();
  const sortComponent = new Sort();

  if (arr.length === 0) {
    const noPointComponent = new NoPoint().element;

    return renderElement(board, noPointComponent);
  }

  renderElement(board, sortComponent.element);

  renderElement(board, listComponent.element);

  arr.forEach((element) => {
    renderPoint(listComponent.element, element);
  });
};

renderBoard(siteBoard, points);
