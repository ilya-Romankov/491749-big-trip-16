export const createTemplateOffers = (obj) => (
  `<li class="event__offer">
    <span class="event__offer-title">${obj.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${obj.price}</span>
   </li>`
);
