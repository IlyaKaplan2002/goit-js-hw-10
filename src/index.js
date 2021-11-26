import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/refs';
import { makeInfo, makeListOfCountries } from './js/makeMarkup';

const DEBOUNCE_DELAY = 300;

const clearAll = () => {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
};

const onMoreThenTen = () => {
  clearAll();
  Notify.info('Too many matches found. Please enter a more specific name.');
};

const onError = () => {
  clearAll();
  Notify.failure('Oops, there is no country with that name');
};

const onLessThenTen = countries => {
  // console.log('less then 10');
  // console.log(countries);
  clearAll();
  makeListOfCountries(countries);
};

const onOneCountry = country => {
  console.log('only 1');
  console.log(country);
  clearAll();
  makeInfo(country[0]);
};

const afterFetch = res => {
  if (res.length > 10) {
    onMoreThenTen();
  } else if (res.length > 1 && res.length <= 11) {
    onLessThenTen(res);
  } else if (res.length === 1) {
    onOneCountry(res);
  }
};

const onInput = e => {
  const query = e.target.value.trim();
  // console.log(query);
  if (!query) clearAll();
  else fetchCountries(query).then(afterFetch).catch(onError);
};

refs.inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
// fetchCountries('swi').then(console.log).catch(console.log);
