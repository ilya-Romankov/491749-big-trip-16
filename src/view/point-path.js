import he from 'he';
import AbstractView from './abstract-view';
import { convertDate } from '../helpers/date';
import { getDuration } from '../helpers/date';
import { getTotalPrice } from '../helpers/total-price';
import { DateFormat } from '../constant';
import { createTemplateOffers } from './create-template-offers.js';

const isFavoriteCheck = (favorite) => favorite ? 'event__favorite-btn event__favorite-btn--active' : 'event__favorite-btn';
const renderOffers = (offer) => {
  if (offer === null) {
    return '';
  }

  return offer.map(createTemplateOffers).join('');
};

const createPointPathTemplate = (point) => {
  const {type, destination, basePrice, isFavorite} = point;
  const offers = point.offers ? point.offers.offers: null;
  const totalPrice = getTotalPrice(basePrice, offers);
  const favorite = isFavoriteCheck(isFavorite);
  const dateToHours = convertDate(point.dateTo, DateFormat.HOURS_MINUTES);
  const dateFromDay = convertDate(point.dateFrom, DateFormat.DATE_MOUNTH);
  const dateFromHours = convertDate(point.dateFrom, DateFormat.HOURS_MINUTES);

  const duration = getDuration(point.dateFrom, point.dateTo);

  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" dateTime="2019-03-18">${dateFromDay}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${type} ${he.encode(destination.name)}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" dateTime="2019-03-18T10:30">${dateFromHours}</time>
                  &mdash;
                  <time class="event__end-time" dateTime="2019-03-18T11:00">${dateToHours}</time>
                </p>
                <p class="event__duration">${duration}</p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${totalPrice}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${renderOffers(offers)}
              </ul>
              <button class="${favorite}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path
                    d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
};

export default class PointPath extends AbstractView {
  #point = null;

  constructor(point) {
    super();

    this.#point = point;
  }

  get template() {
    return createPointPathTemplate(this.#point);
  }

  setStateEditPoint = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }


  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
