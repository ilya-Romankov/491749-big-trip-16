import dayjs from 'dayjs';

export const convertDateEditTemplate = (date) => dayjs(date).format('d/mm/YY hh:mm');

