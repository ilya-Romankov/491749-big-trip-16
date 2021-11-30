import dayjs from 'dayjs';
import { City,Type, Description, Offer, RandomValue } from '../constant';
import { getRandomIndex, getRandomInteger } from '../helpers/random';

const getDate = () => {
  const dayGapFrom = getRandomInteger(RandomValue.StartDay, RandomValue.SecondDays[0] );
  const dayGapTo = getRandomInteger(RandomValue.SecondDays[1], RandomValue.EndDay);
  return {
    dateFrom: dayjs().add(dayGapFrom, 'day').toDate(),
    dateTo:  dayjs().add(dayGapTo, 'day').toDate(),
  };
};

const destination = {
  'description': getRandomIndex(Description),
  'name': getRandomIndex(City),
  'pictures': [
    {
      'src': `http://picsum.photos/300/200?r=${getRandomInteger(RandomValue.RangePhoto[0], RandomValue.RangePhoto[1])}`,
      'description': getRandomIndex(Description)
    },
    {
      'src': `http://picsum.photos/300/200?r=${getRandomInteger(RandomValue.RangePhoto[0], RandomValue.RangePhoto[1])}`,
      'description': getRandomIndex(Description)
    },
    {
      'src': `http://picsum.photos/300/200?r=${getRandomInteger(RandomValue.RangePhoto[0], RandomValue.RangePhoto[1])}`,
      'description': getRandomIndex(Description)
    },
    {
      'src': `http://picsum.photos/300/200?r=${getRandomInteger(RandomValue.RangePhoto[0], RandomValue.RangePhoto[1])}`,
      'description': getRandomIndex(Description)
    }
  ]
};

const generateNewOffer = () => {
  const offer = [
    {
      'type': getRandomIndex(Type),
      'offers': [
        {
          'id': 1,
          'title': getRandomIndex(Offer),
          'price': getRandomInteger(RandomValue.StartPrice, RandomValue.EndPrice),
        }, {
          'id': 2,
          'title':  getRandomIndex(Offer),
          'price': getRandomInteger(RandomValue.StartPrice, RandomValue.EndPrice),
        }
      ]
    }
  ];

  return offer;
};

export const  generatePoint = () => ({
  basePrice: getRandomInteger(RandomValue.StartPrice, RandomValue.EndPrice),
  dateFrom: getDate().dateFrom,
  dateTo: getDate().dateTo,
  destination,
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: generateNewOffer()[0],
  type: getRandomIndex(Type)
}
);


