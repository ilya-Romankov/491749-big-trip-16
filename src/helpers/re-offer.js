import {offerAll} from '../mock/pathPoint';

export const reOffer  = offerAll.reduce((acc,currentItem) => ({...acc, [currentItem.type]: currentItem.offers}), {});
