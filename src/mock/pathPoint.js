import dayjs from 'dayjs';
import { CITY, TYPE, DESCRIPTION, OFFER, GeneratorsConfig } from '../constant';
import { getRandomIndex, getRandomInteger } from '../helpers/random';

const getDate = () => {
  const dayGapFrom = getRandomInteger(GeneratorsConfig.START_DAY, GeneratorsConfig.SECONDARY_START_DAY);
  const dayGapTo = getRandomInteger( GeneratorsConfig.SECONDARY_FINISH_DAY, GeneratorsConfig.END_DAY);
  return {
    dateFrom: dayjs().add(dayGapFrom, 'day').toDate(),
    dateTo: dayjs().add(dayGapTo, 'day').toDate(),
  };
};

const destination = {
  'description': getRandomIndex(DESCRIPTION),
  'name': getRandomIndex(CITY),
  'pictures': [
    {
      'src': `http://picsum.photos/300/200?r=${getRandomInteger(GeneratorsConfig.START_PHOTO, GeneratorsConfig.END_PHOTO)}`,
      'description': getRandomIndex(DESCRIPTION)
    },
    {
      'src': `http://picsum.photos/300/200?r=${getRandomInteger(GeneratorsConfig.START_PHOTO, GeneratorsConfig.END_PHOTO)}`,
      'description': getRandomIndex(DESCRIPTION)
    },
    {
      'src': `http://picsum.photos/300/200?r=${getRandomInteger(GeneratorsConfig.START_PHOTO, GeneratorsConfig.END_PHOTO)}`,
      'description': getRandomIndex(DESCRIPTION)
    },
    {
      'src': `http://picsum.photos/300/200?r=${getRandomInteger(GeneratorsConfig.START_PHOTO, GeneratorsConfig.END_PHOTO)}`,
      'description': getRandomIndex(DESCRIPTION)
    }
  ]
};

const generateNewOffer = () => [
  {
    'type': getRandomIndex(TYPE),
    'offers': [
      {
        'id': 1,
        'title': getRandomIndex(OFFER),
        'price': getRandomInteger(GeneratorsConfig.START_PRICE, GeneratorsConfig.END_PRICE),
      }, {
        'id': 2,
        'title': getRandomIndex(OFFER),
        'price': getRandomInteger(GeneratorsConfig.START_PRICE, GeneratorsConfig.END_PRICE),
      }
    ]
  },
  {
    'type': getRandomIndex(TYPE),
    'offers': [
      {
        'id': 1,
        'title': getRandomIndex(OFFER),
        'price': getRandomInteger(GeneratorsConfig.START_PRICE, GeneratorsConfig.END_PRICE),
      }, {
        'id': 2,
        'title': getRandomIndex(OFFER),
        'price': getRandomInteger(GeneratorsConfig.START_PRICE, GeneratorsConfig.END_PRICE),
      }
    ]
  },
  {
    'type': getRandomIndex(TYPE),
    'offers': [
      {
        'id': 1,
        'title': getRandomIndex(OFFER),
        'price': getRandomInteger(GeneratorsConfig.START_PRICE, GeneratorsConfig.END_PRICE),
      }, {
        'id': 2,
        'title': getRandomIndex(OFFER),
        'price': getRandomInteger(GeneratorsConfig.START_PRICE, GeneratorsConfig.END_PRICE),
      }
    ]
  },
  {
    'type': getRandomIndex(TYPE),
    'offers': [
      {
        'id': 1,
        'title': getRandomIndex(OFFER),
        'price': getRandomInteger(GeneratorsConfig.START_PRICE, GeneratorsConfig.END_PRICE),
      }, {
        'id': 2,
        'title': getRandomIndex(OFFER),
        'price': getRandomInteger(GeneratorsConfig.START_PRICE, GeneratorsConfig.END_PRICE),
      }
    ]
  },
  {
    'type': getRandomIndex(TYPE),
    'offers': [
      {
        'id': 1,
        'title': getRandomIndex(OFFER),
        'price': getRandomInteger(GeneratorsConfig.START_PRICE, GeneratorsConfig.END_PRICE),
      }, {
        'id': 2,
        'title': getRandomIndex(OFFER),
        'price': getRandomInteger(GeneratorsConfig.START_PRICE, GeneratorsConfig.END_PRICE),
      }
    ]
  }
];

export const  generatePoint = () => ({
  basePrice: getRandomInteger(GeneratorsConfig.START_PRICE, GeneratorsConfig.END_PRICE),
  dateFrom: getDate().dateFrom,
  dateTo: getDate().dateTo,
  destination,
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers:  getRandomIndex(generateNewOffer()),
  type: getRandomIndex(TYPE)
}
);
