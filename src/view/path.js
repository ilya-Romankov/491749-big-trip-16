import AbstractView from './abstract';
import {getTotalPath} from '../helpers/total-path';
import { getTotalPriceForAllPoints } from '../helpers/total-price';
import {getTotalDuration} from '../helpers/date';

export const createPathTemplate = (path, price, duration) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${path}</h1>

      <p class="trip-info__dates">${duration.dateFrom}&nbsp;—&nbsp;${duration.dateTo}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>
  </section>`
);

export default class Path extends AbstractView {
  #totalAllPointsPrice = null;
  #totalAllPointPath = null;
  #totalDuration = null;

  constructor(points) {
    super();
    this.#totalAllPointPath = getTotalPath(points);
    this.#totalAllPointsPrice = getTotalPriceForAllPoints(points);
    this.#totalDuration = getTotalDuration(points);
  }

  get template() {
    return createPathTemplate(this.#totalAllPointPath, this.#totalAllPointsPrice, this.#totalDuration);
  }
}
