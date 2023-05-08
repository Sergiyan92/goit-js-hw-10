const filter = `name,capital,population,flags,languages`;
const BASA_URL = 'https://restcountries.com/v3.1/name/';
export function fetchCountries(searchQuery) {
  return fetch(`${BASA_URL}${searchQuery}?fields=${filter}`).then(response =>
    response.json()
  );
}
