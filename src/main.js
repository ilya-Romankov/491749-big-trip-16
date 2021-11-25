import { createNavigationTemplate } from './view/navigation';
import { createFilterTemplate } from './view/filter';
import { createPathTemplate } from './view/path';
import { createSortTemplate } from './view/sort';
import { createEventListTemplate } from './view/eventsList';
import { createPointPathTemplate } from './view/pointPath';
import { createNewPointTemplate } from './view/newPoint';
import { renderTemplate } from './helpers/render';
import { RenderPosition, POINT_COUNT } from './constant';

const body = document.querySelector('.page-body');

const siteNavigationElement = body.querySelector('.trip-controls__navigation');
renderTemplate(siteNavigationElement, createNavigationTemplate());

const siteFiltersElement = body.querySelector('.trip-controls__filters');
renderTemplate(siteFiltersElement, createFilterTemplate());

const sitePathElement = body.querySelector('.trip-main');
renderTemplate(sitePathElement, createPathTemplate(), RenderPosition.AFTER_BEGIN);

const siteSortElement = body.querySelector('.trip-events');
renderTemplate(siteSortElement, createSortTemplate());

renderTemplate(siteSortElement, createEventListTemplate());

const listElement = body.querySelector('.trip-events__list');

for (let i = 0; i < POINT_COUNT; i++) {
  renderTemplate(listElement, createPointPathTemplate());
}

renderTemplate(listElement, createNewPointTemplate(), RenderPosition.AFTER_BEGIN);
