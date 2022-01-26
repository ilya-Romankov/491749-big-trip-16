import AbstractView from './abstract';

const createFilterMenu = (filter, currentFilter) =>(
  `<div class="trip-filters__filter">
      <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio"
             name="trip-filter" value="${filter.type}" ${filter.type === currentFilter ? 'checked' : ''}>
       <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
    </div>
`);

const createFilterTemplate = (filters ,currentFilter) => (
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterMenu(filter, currentFilter)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterSection extends AbstractView {
  #currentFilter = null;
  #filters = null
  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
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
