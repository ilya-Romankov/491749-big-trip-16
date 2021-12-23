import dayjs from 'dayjs';

const getDiffTime = (point) => {
  const dateTo = dayjs(point.dateFrom);
  const dateFrom  = dayjs(point.dateTo);

  return dateTo.diff(dateFrom);
};

const getSortDay = (firstPoint, secondPoint) => Math.sign(firstPoint.dateFrom - secondPoint.dateFrom);

const getSortPrice = (firstPoint, secondPoint) => Math.sign(firstPoint.basePrice - secondPoint.basePrice) * -1;

const getSortTime = (firstPoint, secondPoint) => {
  const firstTime = getDiffTime(firstPoint);
  const secondTime = getDiffTime(secondPoint);

  return Math.sign(firstTime - secondTime) * -1;
};

export const sortMethod = {
  SORT_DAY: getSortDay,
  SORT_PRICE: getSortPrice,
  SORT_TIME: getSortTime
};
