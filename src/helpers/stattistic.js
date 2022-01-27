import dayjs from 'dayjs';

const createPriceStats = (points) => [...new Set(points.map((point) => point.type))]
  .map((type) => {
    const filterType = points.filter((point) => point.type === type);
    const sum = filterType.reduce((acc, val) => (acc + val.basePrice), 0);
    return {[type]: sum};
  })
  .sort((firstPoint,secondPoint) => Object.values(secondPoint) - Object.values(firstPoint));

const createTypeStats = (points) => [...new Set(points.map((point) => point.type))]
  .map((type) => ({[type]: points.filter((point) => point.type === type).length}))
  .sort((firstPoint,secondPoint) => Object.values(secondPoint) - Object.values(firstPoint));

const createTimeStats = (points) => [...new Set(points.map((point) => point.type))]
  .map((type) => {
    const filterType = points.filter((point) => point.type === type);
    const sum = filterType.reduce((acc, val) => (acc +  dayjs(val.dateTo).diff(val.dateFrom)), 0);
    return {[type]: sum};
  })
  .sort((firstPoint,secondPoint) => Object.values(secondPoint) - Object.values(firstPoint));

export {createPriceStats, createTypeStats, createTimeStats};
