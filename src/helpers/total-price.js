export const getTotalPrice = (basePrice, offers) => {
  if (offers === null || offers.length === 0) {
    return basePrice;
  }

  return offers.reduce((acc, current)=> acc + current.price, basePrice);
};

export const getTotalPriceForAllPoints = (points) => {
  if (points === null || points.length === 0) {
    return null;
  }

  return points.reduce((acc, current) => acc + getTotalPrice(current.basePrice, current.offers.offers), 0);

};
