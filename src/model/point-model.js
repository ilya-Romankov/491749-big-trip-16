import AbstractObservable from '../helpers/abstract-observable.js';
import { UpdateType } from '../constant';

export default class PointModel extends AbstractObservable {
  #points = [];
  #offers = [];
  #distanations = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get point() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get distanations() {
    return this.#distanations;
  }

  init = async () => {
    const points = await this.#apiService.points;
    this.#points = points.map(this.#adaptToClient);
    this.#offers = await this.#apiService.offers;
    this.#distanations = await this.#apiService.destinations;

    this._notify(UpdateType.INIT);
  }

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting points');
    }

    try {
      const response = await this.#apiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points.splice(updatedPoint, 1, update);
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update task');
    }
  }

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#apiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  }

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }
    try {
      await this.#apiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete task');
    }
  }

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'], // На клиенте дата хранится как экземпляр Date
      dateFrom: new Date(point['date_from']),
      dateTo: new Date(point['date_to']),
      isFavorite: point['is_favorite'],
      offers: {
        type: point.type,
        offers: point.offers
      }
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
