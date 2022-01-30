import { isPastPoint } from './date';
import dayjs from 'dayjs';
import {FilterType} from '../constant';


export const filter = {
  [FilterType.ALL]: (points) => points.filter((point) => point),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(dayjs(), point.dateTo)),
  [FilterType.FUTURE]: (points) => points.filter((point) => !isPastPoint(dayjs(), point.dateFrom)),
};
