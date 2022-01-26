import { convertDate } from '../helpers/date';
import {DateFormat} from '../constant';
import SmartView from './smart-view';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import {TYPE} from '../constant';
import he from 'he';
import { RADIX } from '../constant';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';


const BLANK_POINT = {
  basePrice: 0,
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  destination: '',
  offers: {
    type:'taxi',
    offers: []
  },
  type: 'taxi'
};

const createImgTemplate = (src) => (
  `<img class="event__photo" src="${src}" alt="Event photo">`
);

const createDestinationTemplate = (destination) => {
  if (destination === null || !destination) {
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

const createOptionTemplate = (obj, offers) => {
  const isChecked = offers.includes(obj);

  return (` <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${obj.id}" type="checkbox"
             name="event-offer-luggage" ${isChecked ? 'checked': ''} value="${obj.title}">
        <label class="event__offer-label" for="event-offer-luggage-${obj.id}">
          <span class="event__offer-title">${obj.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${obj.price}</span>
        </label>
    </div>`
  );
};

const createTypeTemplate = (type, isChecked = false) => (`
        <div class="event__type-item">
            <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" ${isChecked ? 'checked' : ''} name="event-type" value="${type.toLowerCase()}">
            <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
        </div>
  `);

const createToggleTemplate = (typeChecked) => (`
    ${TYPE.map((type) => typeChecked === type ? createTypeTemplate(type, true) :  createTypeTemplate(type)).join('')}
  `);


const createOfferTemplate = (offer, offers, isEdit) => {
  if (offer === null || !offer) {
    return '';
  }

  return `<section class="event__details">
                  <section class="event__section  event__section--offers">
                   <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                   <div class="event__available-offers">
                    ${offer.map((item) => createOptionTemplate(item, offers, isEdit)).join('')}
                   </div>

           </section>`;
};

const createIsEditBtn = (isEdit) => {
  if (isEdit === false || isEdit === null) {
    return '';
  }

  return (
    `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
     </button>`);
};

const createDeleteOrCancelBtn = (isEdit) => {
  const textContenet = isEdit  ? 'Delete' : 'Cancel';

  return( `
    <button class="event__reset-btn" type="reset">${textContenet}</button>
  `);
};

const createCityList = (cityList) => cityList.map((city) => `<option value="${city.name}"></option>`).join('');

const createNewPointTemplate = (point, distinationAll, isEdit, offer) => {
  const {destination, offers, basePrice, dateTo, dateFrom, type, id} = point;

  const destinationTemplate = createDestinationTemplate(destination);

  const currentOfferType = offer[type];


  const offerTemplate = createOfferTemplate(currentOfferType, offers.offers, isEdit);
  const isEditBtnTemplate = createIsEditBtn(isEdit);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${createToggleTemplate(type)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" required type="text" name="event-destination" value="${destination ? he.encode(destination.name) : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createCityList(distinationAll)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input event__input--dateFrom  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${convertDate(dateFrom, DateFormat.FULL_DATE)}">
                    —
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input event__input--dateTo  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${convertDate(dateTo, DateFormat.FULL_DATE)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" required id="event-price-1" type="number" name="event-price" value="${he.encode(basePrice.toString())}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  ${createDeleteOrCancelBtn(isEdit)}
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
  #datepickerDateTo = null;
  #datepickerDateFrom = null;
  #isEdit = null;

  constructor(destinationAll, offerAll, isEdit = true, point = BLANK_POINT) {
    super();
    this._data = point;
    this.#destinations = destinationAll;
    this.#offers = offerAll;
    this.#isEdit = isEdit;

    if (!this.#isEdit) {
      this.#getOffersForCreatePoint(this._data.type);
    }

    this.#setInnerHandler();
    this.#setDatapicker();
  }

  get template() {
    return createNewPointTemplate(this._data, this.#destinations, this.#isEdit, this.#offers);
  }


  restoreHandlers = () => {
    this.#setInnerHandler();
    this.#setDatapicker();
    this.setClickDefaultPoint(this._callback.defaultClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerDateTo) {
      this.#datepickerDateTo.destroy();
      this.#datepickerDateTo = null;
    }

    if (this.#datepickerDateFrom) {
      this.#datepickerDateFrom.destroy();
      this.#datepickerDateFrom = null;
    }
  }

  #setClickOfferHandler = (evt) => {
    const currentOffer = this.#offers[this._data.type];
    const checkOffer = currentOffer.find((offer) => offer.title === evt.target.value);
    if (evt.target.checked) {
      return this.updateData({
        offers: {
          type: this._data.type,
          offers: [...this._data.offers.offers, checkOffer]
        }
      });
    }

    return this.updateData({
      offers: {
        type: this._data.type,
        offers: this._data.offers.offers.filter((item) => item.id !== checkOffer.id)
      }
    });
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  setClickDefaultPoint = (callback) => {
    this._callback.defaultClick = callback;

    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#defaultStateClickHandler);
    }
  }

  #setInnerHandler = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
    this.element.querySelector('.event__type-list').addEventListener('click', this.#typeToggleHandler);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#setClickOfferHandler);
    }
    this.element.querySelector('.event__input--price').addEventListener('change', this.#setPriceHandler);
  }

  #setDatapicker = () => {
    this.#setDatapickerDateFrom();
    this.#setDatePickerDateTo();
  }

  #setDatapickerDateFrom = () => {
    this.#datepickerDateFrom = flatpickr(
      this.element.querySelector('.event__input--dateFrom'),
      {
        enableTime: true,
        defaultDate: this._data.dateFrom ,
        dateFormat: DateFormat.DATE_EDIT_POINT,
        maxDate: this._data.dateTo,
        onChange: this.#dateFromChangeHandler,
        parseDate: (datestr, format) => convertDate(datestr, format)
      }
    );
  }

  #setDatePickerDateTo = () => {
    this.#datepickerDateFrom = flatpickr(
      this.element.querySelector('.event__input--dateTo'),
      {
        enableTime: true,
        defaultDate: this._data.dateTo,
        dateFormat: DateFormat.DATE_EDIT_POINT,
        minDate: this._data.dateFrom,
        onChange: this.#dateToChangeHandler,
        parseDate: (datestr, format) => convertDate(datestr, format)
      }
    );
  }

  #setPriceHandler = (evt) => {
    this.updateData({
      basePrice: parseInt(evt.target.value, RADIX)
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate
    });
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate
    });
  }

  #destinationToggleHandler = (evt) => {
    const destinationFind = this.#destinations.find((destination) => destination.name === evt.target.value);

    if (!destinationFind) {
      evt.target.setCustomValidity('Такого города нет');
      return;
    }

    if (evt.target.length === '') {
      evt.target.setCustomValidity('Нужно заполнить поле');
      return;
    }

    this.updateData({
      destination: destinationFind
    });
  };

  #typeToggleHandler = (evt) => {
    if (evt.target.value) {
      this.updateData({
        offers: {
          type: evt.target.value,
          offers: []
        },
        type: evt.target.value,
      });
    }
  };

  #getOffersForCreatePoint = (type) => {
    const findOffer = this.#offers[type];

    this.updateData({
      offers: {
        type: findOffer.type,
        offers: []
      }

    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }


  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(this._data);
  }

  #defaultStateClickHandler = () => {
    this._callback.defaultClick();
  }
}
