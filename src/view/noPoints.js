import AbstractView from './abstract';
import {FilterType} from '../constant';

const NoTasksTextType = {
  [FilterType.ALL]: 'No point. Click Add Point',
  [FilterType.PAST]: 'No past point. Click Add Point',
  [FilterType.FUTURE]: 'No future point. Click Add Point',
};

const createNoPointTemplate = (filterType) => {

  const noTaskTextValue = NoTasksTextType[filterType];

  return (
    `<p class="trip-events__msg">${noTaskTextValue}</p>`
  );
};

export default class NoPoint extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createNoPointTemplate(this._data);
  }
}
