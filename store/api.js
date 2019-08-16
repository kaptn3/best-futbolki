const url = 'http://api.best-futbolki.ru/API';

export const state = () => ({
  url,
  ref: `${url}/catalog_references.php`,
  delivery: `${url}/delivery.php`,
  city: `${url}/delivery_suggest.php?text=`,
  order: `${url}/order.php`
});
