import {FilterType} from '../constant';
import { isPastPoint } from './date';
import dayjs from 'dayjs';

export const filter = {
  [FilterType.ALL]: (points) => points.filter((point) => point),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(dayjs(), point.dateTo)),
  [FilterType.FUTURE]: (points) => points.filter((point) => !isPastPoint(dayjs(), point.dateFrom))
};
