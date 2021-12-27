import dayjs from 'dayjs';

export const convertDate = (date, format) => dayjs(date).format(format);

export const getDiffTime = (dateFrom, dateTo) => {
  const from = dayjs(dateFrom);
  const to  = dayjs(dateTo);

  return to.diff(from);
};

//Функция будет еще дорабатыватьсся, сейчас сделана только проверки праивльности сортировки
export const getDuration = (dateFrom, dateTo) => {
  const ms = getDiffTime(dateFrom, dateTo);
  let days = '';
  let hours = '';
  const minutes = `${convertDate(ms,'mm')}M`;

  if (convertDate(ms, 'DD') !== '00') {
    days = `${convertDate(ms, 'DD')}D`;
  }

  if (convertDate(ms,'hh') !== '00') {
    hours = `${convertDate(ms,'hh')}H`;
  }

  return `${days} ${hours} ${minutes}`;
};
