import { refs } from './refs';

export const makeListOfCountries = countries => {
  const markup = countries.reduce((acc, country) => {
    acc += `<li class="countryItem"><img class="countryImage" src="${country.flag}">${country.name}</li>`;
    return acc;
  }, '');

  refs.countryList.innerHTML = markup;
};

export const makeInfo = country => {
  const { name, flag, languages, capital, population } = country;

  const languagesKeys = Object.keys(languages);
  const languagesMarkup =
    '<ul>' +
    languagesKeys.reduce((acc, key) => {
      acc += `<li>${languages[key]}</li>`;
      return acc;
    }, '') +
    '</ul>';

  const markup = `
  <img class="infoImage" src="${flag}"><h1>${name}</h1>
  <p><span class='capitalLabel'>Capital</span><span class='capital'>${capital}</span></p>
  <p><span class='populationLabel'>Capital</span><span class='population'>${population}</span></p>
  <p><span class='languagesLabel'>Capital</span><span class='languages'>${languagesMarkup}</span></p>`;

  refs.countryInfo.innerHTML = markup;
};
