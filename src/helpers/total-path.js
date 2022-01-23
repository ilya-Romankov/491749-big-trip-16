import {SortValue} from '../constant';
import { Sort } from './sorting';
export const getTotalPath = (points) => {
  if (points === null || points.length === 0) {
    return null;
  }

  const sortDayPoint = points.sort(Sort[SortValue.SORT_DAY]);
  const length = sortDayPoint.length;

  if (length < 4) {
    return sortDayPoint.reduce((acc, current) => [...acc, current.destination.name], []).join(' — ');
  }

  return `${sortDayPoint[0].destination.name} — . . . — ${sortDayPoint[points.length - 1].destination.name}`;
};


