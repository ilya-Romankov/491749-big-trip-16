import Navigation from './view/navigation';
import FilterSection from './view/filter';
import Path from './view/path';
import Sort from './view/sort';
import EventsList from './view/eventsList';
import PointPath from './view/pointPath';
import NewPoint from './view/newPoint';
import NoPoint from './view/noPoints';
import { renderElement, replace } from './helpers/render';
import { POINT_COUNT, RenderPosition, KeyCode } from './constant';
import { generatePoint } from './mock/pathPoint';


const points = Array.from({length: POINT_COUNT}, generatePoint);

const body = document.querySelector('.page-body');

const sitePathElement = body.querySelector('.trip-main');
const path = new Path();

renderElement(sitePathElement, path, RenderPosition.AFTER_BEGIN);

const siteNavigationElement = body.querySelector('.trip-controls__navigation');
const navigation = new Navigation();

renderElement(siteNavigationElement, navigation);

const filterSection =  new FilterSection();
const siteFiltersElement = body.querySelector('.trip-controls__filters');

renderElement(siteFiltersElement, filterSection);

const siteBoard = body.querySelector('.trip-events');

let stateOpenComponent = null;
let stateCloseComponent = null;

const renderPoint = (pointList, point) => {
  const pointElement = new PointPath(point);
  const newPointElement = new NewPoint(point);

  const escKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      evt.preventDefault();
      replace(pointElement, newPointElement);
      stateOpenComponent = null;
      stateCloseComponent = null;
      document.removeEventListener('keydown', escKeyDown);
    }
  };

  const switchToPathPoint = () => {
    replace(pointElement, newPointElement);
    stateOpenComponent = null;
    stateCloseComponent = null;
  };

  const switchToFormEdit = () => {
    if (stateOpenComponent === null) {
      stateOpenComponent = newPointElement;
      stateCloseComponent = pointElement;
    } else {
      replace(stateCloseComponent, stateOpenComponent);
      stateOpenComponent = newPointElement;
      stateCloseComponent = pointElement;
    }
    replace(newPointElement, pointElement);
  };


  pointElement.setStateEditPoint(() => {
    switchToFormEdit();
    document.addEventListener('keydown', escKeyDown);
  });

  newPointElement.setClickDefaultPoint(() => {
    switchToPathPoint();
    document.removeEventListener('keydown', escKeyDown);
  });

  newPointElement.setSubmitDefaultPoint(() => {
    switchToPathPoint();
    document.removeEventListener('keydown', escKeyDown);
  });

  renderElement(pointList, pointElement);
};

const renderBoard = (board, arr) => {
  const listComponent = new EventsList();
  const sortComponent = new Sort();

  if (arr.length === 0) {
    const noPointComponent = new NoPoint();

    return renderElement(board, noPointComponent);
  }

  renderElement(board, sortComponent);

  renderElement(board, listComponent);

  arr.forEach((element) => {
    renderPoint(listComponent, element);
  });
};

renderBoard(siteBoard, points);
