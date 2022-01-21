import AbstractObservable from '../helpers/abstract-observable.js';

export default class PointModel extends AbstractObservable {
  #points = [];

  set point(point) {
    this.#points = [...point];
  }

  get point() {
    return this.#points;
  }

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting points');
    }

    this.#points.splice(index, 1, update);

    this._notify(updateType, update);
  }

  addPoint = (updateType, update) => {
    this.#points= [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
