import Navigation from './view/navigation';
import Filters from './view/filter';
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
renderElement(sitePathElement, new Path().element, RenderPosition.AFTER_BEGIN);

const siteNavigationElement = body.querySelector('.trip-controls__navigation');
renderElement(siteNavigationElement, new Navigation().element);

const siteFiltersElement = body.querySelector('.trip-controls__filters');
renderElement(siteFiltersElement, new Filters().element);

const siteBoard = body.querySelector('.trip-events');

const renderPoint = (pointList, point) => {
  const pointElement = new PointPath(point).element;
  const newPointElement = new NewPoint(point).element;
  const btnOpenEdit = pointElement.querySelector('.event__rollup-btn');
  const form  = newPointElement.querySelector('.event--edit');

  const escKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      evt.preventDefault();
      pointList.replaceChild(pointElement, newPointElement);
    }
  };

  btnOpenEdit.addEventListener('click', () => {
    pointList.replaceChild(newPointElement, pointElement);
    document.addEventListener('keydown', escKeyDown);
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pointList.replaceChild(pointElement, newPointElement);
    document.removeEventListener('keydown', escKeyDown);
  });

  renderElement(pointList, pointElement);
};

const renderBoard = (board, arr) => {
  const listComponent = new EventsList().element;
  const sortComponent = new Sort().element;
  const noPointComponent = new NoPoint().element;

  if (arr.length === 0) {
    renderElement(board, noPointComponent);
    return;
  }

  renderElement(board, sortComponent);
  renderElement(board, listComponent);
  arr.forEach((element) => {
    renderPoint(listComponent, element);
  });
};

renderBoard(siteBoard, points);
