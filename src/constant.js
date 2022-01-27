export const POINT_COUNT = 9;

export const NUMBER_FOR_FULL_PATH = 4;

export const RADIX = 10;

export const RenderPosition = {
  BEFORE_BEGIN: 'before',
  AFTER_BEGIN: 'prepend',
  BEFORE_END: 'append',
  AFTER_END: 'after',
};

export const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

export const CITY = [
  'Moscow',
  'Paris',
  'Roma',
  'Bangkok',
  'Damascus',
  'Madrid'
];

export const TYPE = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

export const GeneratorsConfig = {
  START_DAY: -5,
  SECONDARY_START_DAY: 0,
  SECONDARY_FINISH_DAY: 5,
  END_DAY: 10,
  START_PRICE: 10,
  END_PRICE: 700,
  START_PHOTO: 1,
  END_PHOTO: 100
};

export const DateFormat = {
  FULL_DATE: 'DD/MM/YY hh:mm',
  HOURS_MINUTES: 'hh:m',
  DATE_MOUNTH: 'MMM D',
  DATE_EDIT_POINT: 'Y/m/d H:i',
  MOUNTH_DAY: 'D MMM'
};

export const KeyCode = {
  ESC: 27
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export const SortValue = {
  SORT_DAY: 'sort-day',
  SORT_TIME: 'sort-time',
  SORT_PRICE: 'sort-price'
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_PONT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

export const FilterType = {
  ALL: 'all',
  FUTURE: 'future',
  PAST: 'past'
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const MenuItem = {
  ADD_NEW_POINT: 'ADD_NEW_PONT',
  POINT: 'POINT',
  STATISTICS: 'STATISTICS',
};

export const ChartName = {
  MONEY: 'money',
  TYPE: 'type',
  TIME: 'time'
};

export const ChartParameters = {
  [ChartName.MONEY]: {
    TITLE: 'MONEY',
    LABEL: '€'
  },
  [ChartName.TYPE]: {
    TITLE: 'TYPE',
    LABEL: 'x'
  },
  [ChartName.TIME]: {
    TITLE: 'TIME',
    LABEL: ''
  },
};
