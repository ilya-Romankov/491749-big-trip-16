import { convertDate } from '../helpers/date';
import { DateFormat } from '../constant';
import SmartView from './smart-view';
import { CITY } from '../constant';


const BLANK_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: null,
  offers: null,
  type: ''
};

const createImgTemplate = (src) => (
  `<img class="event__photo" src="${src}" alt="Event photo">`
);

const createDestinationTemplate = (destination) => {
  if (destination === null) {
    return '';
  }

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
       ${destination.pictures.map((item) => createImgTemplate(item.src)).join('')}
      </div>
    </div>
  </section>`;
};

const createOptionTemplate = (obj) => (
  ` <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${obj.id}" type="checkbox"
             name="event-offer-luggage">
        <label class="event__offer-label" for="event-offer-luggage-${obj.id}">
          <span class="event__offer-title">${obj.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${obj.price}</span>
        </label>
    </div>`
);

const createOfferTemplate = (offer) => {
  if (offer === [] || offer === null) {
    return '';
  }

  return `<section class="event__details">
                  <section class="event__section  event__section--offers">
                   <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                   <div class="event__available-offers">
                    ${offer.offers.map((item) => createOptionTemplate(item)).join('')}
                   </div>

           </section>`;
};

const createIsEditBtn = (isEdit) => {
  if (!isEdit) {
    return '';
  }

  return (
    `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
     </button>`);
};

const createCityList = (cityList) => cityList.map((city) => `<option value="${city}"></option>`).join('');

const createNewPointTemplate = (point, isEdit = true) => {

  const {destination, offers, basePrice, dateTo, dateFrom, type} = point;

  const destinationTemplate = createDestinationTemplate(destination);
  const offerTemplate = createOfferTemplate(offers);
  const isEditBtnTemplate = createIsEditBtn(isEdit);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img className="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createCityList(CITY)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${convertDate(dateFrom, DateFormat.FULL_DATE)}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${convertDate(dateTo, DateFormat.FULL_DATE)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                   ${isEditBtnTemplate}
                </header>
                   ${offerTemplate}
                   ${destinationTemplate}
                </section>
              </form>
            </li>`;
};

export default class NewPoint extends SmartView {
  #destinations = null;
  #offers = null;

  constructor(point = BLANK_POINT, destinationAll, offerAll) {
    super();

    this._data = point;
    this.#destinations = destinationAll;
    this.#offers = offerAll;
    this.#setInnerHandler();
  }

  get template() {
    return createNewPointTemplate(this._data);
  }

  #setInnerHandler = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
    this.element.querySelector('.event__type-list').addEventListener('click', this.#typeToggleHandler);
  }

  restoreHandlers = () => {
    this.#setInnerHandler();
    this.setClickDefaultPoint(this._callback.defaultClick);
    this.setSubmitDefaultPoint(this._callback.defaultSubmit);
  }


  #destinationToggleHandler = (evt) => {
    const destinationFind = this.#destinations.find((destination) => destination.name === evt.target.value);

    if (!destinationFind) {
      evt.target.setCustomValidity('Такого города нет');
      return;
    }

    this.updateData({
      destination: destinationFind
    });
  };

  #typeToggleHandler = (evt) => {
    if (evt.target.value) {
      const findOffer = this.#offers.find((offer) => offer.type === evt.target.value);

      this.updateData({
        offers: findOffer,
        type: findOffer.type
      });
    }
  };

  setClickDefaultPoint = (callback) => {
    this._callback.defaultClick = callback;

    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#defaultStateClickHandler);
    }

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#defaultStateClickHandler);
  }

  setSubmitDefaultPoint = (callback) => {
    this._callback.defaultSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#defaultStateFormHandler);
  }

  #defaultStateClickHandler = () => {
    this._callback.defaultClick();
  }

  #defaultStateFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.defaultSubmit();
  }
}
