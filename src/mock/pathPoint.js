import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomIndex = (arr, startIndex) => arr[getRandomInteger(startIndex, arr.length - 1)];

const generateDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
  ];

  return getRandomIndex(description, 0);
};

const generateCity = () => {
  const city = [
    'Moscow',
    'Paris',
    'Roma',
    'Bangkok',
    'Damascus',
    'Madrid'
  ];

  return getRandomIndex(city, 0);
};

const generateType = () => {
  const type = [
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

  return  getRandomIndex(type, 0);
};

const getDate = () => {
  const day  = 1;
  const dayGapFrom = getRandomInteger(day, day + 1);
  const dayGapTo = getRandomInteger(day + 2, day + 4);
  return {
    DATE_FROM: dayjs().add(dayGapFrom, 'day').toDate(),
    DATE_TO:  dayjs().add(dayGapTo, 'day').toDate(),
  };
};

const destination = {
  'description': generateDescription(),
  'name': generateCity(),
  'pictures': [
    {
      'src': `http://picsum.photos/300/200?r=${getRandomInteger(1, 100)}`,
      'description': generateDescription()
    }
  ]
};


const offer = {
  'type': generateType(),
  'offers': [
    {
      'id': 1,
      'title': 'Upgrade to a business class',
      'price': getRandomInteger(10, 50)
    }, {
      'id': 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(10, 50)
    }
  ]
};

export const  generatePoint = () => ({
  'base_price': getRandomInteger(200, 700),
  'date_from': getDate().DATE_FROM,
  'date_to': getDate().DATE_TO,
  'destination': destination,
  'is_favorite': Boolean(getRandomInteger(0, 1)),
  'offers': offer,
  'type': generateType()
}
);


