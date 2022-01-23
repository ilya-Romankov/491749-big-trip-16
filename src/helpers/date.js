import dayjs from 'dayjs';
import {DateFormat, SortValue} from '../constant';
import {Sort} from './sorting';
export const convertDate = (date, format) => dayjs(date).format(format);

export const getDiffTime = (dateFrom, dateTo) => {
  const from = dayjs(dateFrom);
  const to  = dayjs(dateTo);

  return to.diff(from);
};

export const getDuration = (dateFrom, dateTo) => {
  const ms = getDiffTime(dateFrom, dateTo);

  let days = '';
  let hours = '';
  const minutes = `${convertDate(ms,'mm')}M`;

  if (convertDate(ms, 'DD') !== '00') {
    days = `${convertDate(ms, 'DD')}D`;
  }

  if (convertDate(ms,'hh') === '00' && days !== '') {
    hours = '00H';
  }

  if (convertDate(ms,'hh') !== '00') {
    hours = `${convertDate(ms,'hh')}H`;
  }

  return `${days} ${hours} ${minutes}`;
};

export const  isPastPoint = (currentDate, dateFromPoint) => dayjs().isAfter(dateFromPoint);

export const getTotalDuration = (points) => {
  if (points === null || points.length === 0) {
    return null;
  }


  const sortPoints = points.sort(Sort[SortValue.SORT_DAY]);
  console.log(sortPoints)

  if (sortPoints.length === 1) {
    return {
      dateFrom: convertDate(sortPoints[0].dateFrom, DateFormat.MOUNTH_DAY),
      dateTo: convertDate(sortPoints[0].dateTo, DateFormat.MOUNTH_DAY)
    };
  }

  return {
    dateFrom: convertDate(sortPoints[0].dateFrom, DateFormat.MOUNTH_DAY),
    dateTo: convertDate(sortPoints[sortPoints.length - 1].dateTo, DateFormat.MOUNTH_DAY)
  };
};
