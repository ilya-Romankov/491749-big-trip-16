import { getDiffTime } from './date';
import { SortValue } from '../constant';
import {getTotalPrice} from './total-price';

const getSortDay = (firstPoint, secondPoint) => Math.sign(firstPoint.dateFrom - secondPoint.dateFrom);

const getSortPrice = (firstPoint, secondPoint) => Math.sign(getTotalPrice(secondPoint.basePrice,secondPoint.offers.offers)  - getTotalPrice(firstPoint.basePrice,firstPoint.offers.offers));

const getSortTime = (firstPoint, secondPoint) => {
  const firstTime = getDiffTime(firstPoint.dateFrom, firstPoint.dateTo);
  const secondTime = getDiffTime(secondPoint.dateFrom, secondPoint.dateTo);

  return Math.sign(secondTime - firstTime);
};

export const Sort = {
  [SortValue.SORT_DAY]: getSortDay,
  [SortValue.SORT_PRICE]: getSortPrice,
  [SortValue.SORT_TIME]: getSortTime
};
