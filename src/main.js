import Navigation from './view/navigation';
import { renderElement } from './helpers/render';
import { POINT_COUNT} from './constant';
import { generatePoint } from './mock/pathPoint';
import BoardPresenter from './presenter/board-presenter';
import PointModel from './model/point-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const points = Array.from({length: POINT_COUNT}, generatePoint);

const pointModel = new PointModel();
pointModel.point = points;

const filterModel = new FilterModel();

const body = document.querySelector('.page-body');

const siteNavigationElement = body.querySelector('.trip-controls__navigation');
const navigation = new Navigation();

renderElement(siteNavigationElement, navigation);

const siteFiltersElement = body.querySelector('.trip-controls__filters');


const siteBoard = body.querySelector('.trip-events');

const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, pointModel);
const boardPresenter = new BoardPresenter(siteBoard, pointModel, filterModel);

filterPresenter.init();
boardPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  boardPresenter.createPoint();
});


