import Navigation from './view/navigation';
import Path from './view/path';
import { renderElement } from './helpers/render';
import { POINT_COUNT, RenderPosition } from './constant';
import { generatePoint } from './mock/pathPoint';
import BoardPresenter from './presenter/board-presenter';


const points = Array.from({length: POINT_COUNT}, generatePoint);
console.log(points);

const body = document.querySelector('.page-body');

const sitePathElement = body.querySelector('.trip-main');
const path = new Path();

renderElement(sitePathElement, path, RenderPosition.AFTER_BEGIN);

const siteNavigationElement = body.querySelector('.trip-controls__navigation');
const navigation = new Navigation();

renderElement(siteNavigationElement, navigation);

const siteFiltersElement = body.querySelector('.trip-controls__filters');


const siteBoard = body.querySelector('.trip-events');

const boardPresenter = new BoardPresenter(siteBoard, siteFiltersElement, points);

boardPresenter.init();


