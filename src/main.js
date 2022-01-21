import Navigation from './view/navigation';
import Path from './view/path';
import { renderElement } from './helpers/render';
import { POINT_COUNT, RenderPosition } from './constant';
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

const sitePathElement = body.querySelector('.trip-main');
const path = new Path();

renderElement(sitePathElement, path, RenderPosition.AFTER_BEGIN);

const siteNavigationElement = body.querySelector('.trip-controls__navigation');
const navigation = new Navigation();

renderElement(siteNavigationElement, navigation);

const siteFiltersElement = body.querySelector('.trip-controls__filters');


const siteBoard = body.querySelector('.trip-events');

const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, pointModel);
const boardPresenter = new BoardPresenter(siteBoard, points, pointModel, filterModel);

filterPresenter.init();
boardPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  boardPresenter.createPoint();
});


