export const reOffer  = (offerAll) => offerAll.reduce((acc,currentItem) => ({...acc, [currentItem.type]: currentItem.offers}), {});
