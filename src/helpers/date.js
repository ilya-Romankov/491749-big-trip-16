import dayjs from 'dayjs';

export const convertDate = (date, format) => dayjs(date).format(format);
