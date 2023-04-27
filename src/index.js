import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(event => {
      const valueTrimmed = searchBox.value.trim();

      cleanHtml();
  
      if (valueTrimmed !== '') {
        fetchCountries(valueTrimmed).then(foundData => {
          if (foundData.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } 
          else if (foundData.length === 0) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
          } 
          else if (foundData.length >= 2 && foundData.length <= 10) {
            createCountryList(foundData);
          } 
          else if (foundData.length === 1) {
            createOneCountry(foundData);
          }
        });
      }
    }, DEBOUNCE_DELAY)
  );

  function cleanHtml() {
    countryList.innerHTML = ' ';
    countryInfo.innerHTML = ' ';
  }

  function createCountryList(countries) {
    const countryMarkup = countries
      .map(country => {
        return `<li>
          <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
             <p>${country.name.official}</p>
                    </li>`;
      })
      .join('');
  
    countryList.innerHTML = countryMarkup;
  };

  function createOneCountry(countries) {
    const countryMarkup = countries.map(country => {
        return `<li>
          <img src="${country.flags.svg}" alt="Flag of ${
          country.name.official
        }" width="30" hight="20">
             <p>${country.name.official}</p>
                <p><b>Capital</b>: ${country.capital}</p>
                <p><b>Population</b>: ${country.population}</p>
                <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                    </li>`;
      })
      .join('');
  
    countryList.innerHTML = countryMarkup;
  };

  
