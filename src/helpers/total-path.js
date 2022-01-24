import {SortValue} from '../constant';
import { Sort } from './sorting';
import { NUMBER_FOR_FULL_PATH } from '../constant';

export const getTotalPath = (points) => {
  if (points === null || points.length === 0) {
    return null;
  }

  const sortDayPoint =[...points].sort(Sort[SortValue.SORT_DAY]);
  const length = sortDayPoint.length;

  if (length < NUMBER_FOR_FULL_PATH) {
    const startPath = [];
    return sortDayPoint.map((current) => [...startPath, current.destination.name]).join(' — ');
  }

  const distiantionStart = sortDayPoint[0].destination.name;
  const distiantionEnd = sortDayPoint[points.length - 1].destination.name;
  const separator = '— . . . —';

  return `${distiantionStart} ${separator} ${distiantionEnd}`;
};


