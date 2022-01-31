import AbstractView from './abstract-view';
import { filter } from '../helpers/filter';

const createFilterMenu = (filterSingle, currentFilter, points) => {
  if (points.length === 0) {
    return;
  }

  const filterCount = filter[filterSingle.type]([...points]).length;

  return `<div class="trip-filters__filter">
            <input id="filter-${filterSingle.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${filterCount < 1 ? 'disabled' : ''} value="${filterSingle.type}" ${filterSingle.type === currentFilter ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-${filterSingle.name}">${filterSingle.name}</label>
          </div>`;
};

const createFilterTemplate = (filters ,currentFilter, points) => (
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filterSingle) => createFilterMenu(filterSingle, currentFilter, points)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterSection extends AbstractView {
  #currentFilter = null;
  #filters = null
  #points = null;
  constructor(filters, currentFilterType, points) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#points = [...points];
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter, this.#points);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
