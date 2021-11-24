//ui elements
import { createMenuTemplate } from './view/menu';
import { createFilterTemplate } from './view/filter';
import { createPath } from './view/path';
import { createSortTemplate } from './view/sort';
import { createEventListTemplate } from './view/eventsList';
import { createPointPath } from './view/pointPath';
import { createEditPoint } from './view/editPoint';
import { createNewPoint } from './view/newPoint';

//helper functions
import { RenderPosition, renderTemplate } from './render';
const countPoint = 3;

//main block
const body = document.querySelector('.page-body');

//render menu
const siteMenuElement = body.querySelector('.trip-controls__navigation');
renderTemplate(siteMenuElement, createMenuTemplate(), RenderPosition.BEFOREEND);

//render filter
const siteFiltersElement = body.querySelector('.trip-controls__filters');
renderTemplate(siteFiltersElement, createFilterTemplate(), RenderPosition.BEFOREEND);

//render path and final cost
const sitePathElement = body.querySelector('.trip-main');
renderTemplate(sitePathElement, createPath(), RenderPosition.AFTERBEGIN);

//render sort
const siteSortElement = body.querySelector('.trip-events');
renderTemplate(siteSortElement, createSortTemplate(), RenderPosition.BEFOREEND);

//render event container
renderTemplate(siteSortElement, createEventListTemplate(), RenderPosition.BEFOREEND);

//render point path
const siteListElement = body.querySelector('.trip-events__list ');
for (let i = 0; i < countPoint; i++) {
  renderTemplate(siteListElement, createPointPath(), RenderPosition.BEFOREEND);
}

//render edit point
renderTemplate(siteListElement, createEditPoint(), RenderPosition.AFTERBEGIN);

//render add new point
renderTemplate(siteListElement, createNewPoint(), RenderPosition.AFTERBEGIN);
