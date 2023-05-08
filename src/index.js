import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const ulList = document.querySelector('.country-list');
const countrySearch = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
const nameCountry = document.querySelector('#search-box');
nameCountry.addEventListener(
  'input',
  debounce(event => {
    const searchQuery = nameCountry.value.trim();
    if (searchQuery === '') {
      ulList.innerHTML = '';
      countrySearch.innerHTML = '';
    }
    fetchCountries(searchQuery)
      .then(data => getData(data))
      .catch(error => {
        Notify.failure(error.message);
      });
  }, DEBOUNCE_DELAY)
);

// fetchCountries();
function getData(data) {
  if (data.length > 10) {
    Notify.info(`Too many matches found. Please enter a more specific name.`);
  } else if (data.length <= 10 && data.length >= 2) {
    listCountry(data);
  } else if (data.length === 1) {
    fullListCountry(data);
  } else if (data.status === 404) {
    throw new Error('Oops, there is no country with that name');
  }
}
const listCountry = data => {
  const li = data
    .map(
      el => `<li class="list" ><img src="${el.flags.svg}" alt="${el.flags.alt}" width="30" height="15"><p class="text">${el.name.official}</p>
</li>`
    )
    .join('');
  ulList.innerHTML = li;
};
const fullListCountry = data => {
  ulList.innerHTML = '';
  const liFull = data
    .map(
      el =>
        `<li><img src="${el.flags.svg}" alt="${
          el.flags.alt
        }" width="200" height="100"><p>Повна назва країни: ${
          el.name.official
        }</p><p>Столиця: ${el.capital}</p><p>Населення: ${
          el.population
        }</p><p>Мови: ${Object.values(el.languages)}</p></li>`
    )
    .join('');
  countrySearch.innerHTML = liFull;
};
