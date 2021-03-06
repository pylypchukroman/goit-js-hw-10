import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// console.log(fetchCountries("peru"));

const DEBOUNCE_DELAY = 300;
const searchField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');


searchField.addEventListener('input', debounce((countryInput), DEBOUNCE_DELAY));

function countryInput(evt) {
    const countryName = evt.target.value;
    const clearCountryName = countryName.trim();
   if(!clearCountryName){
    countryList.innerHTML = "";
    } else {
        fetchCountries(clearCountryName)
            .then(countries => {
                if (countries.length > 10) {
                    Notify.info("Too many matches found. Please enter a more specific name.");

                } else if (countries.length >= 2 && countries.length <= 10) {
                     renderFewCountries  (countries)
                    // console.log('знайдено декілька країн');
                } else {
                    renderOneCountry(countries)
                    // console.log('конкретна країна знайдена');
                }
            })
            .catch(error => Notify.failure('Oops, there is no country with that name'));
    }
}


function renderFewCountries (countries) {
const fewCountries = countries.map((country) => {
    return `<li class="country-item">
            <div class="country-wraper"><img class="country-img" src="${country.flags.svg}" width= "50mpx"  alt="${country.name.official}"/>
            <h2 class="country-name-few-countrice"><b>${country.name.official}</b></h2></div>
            </li>`
}).join('')

countryList.innerHTML = fewCountries;
}


function renderOneCountry(countries) {
 const markup = countries.map((country) => {
     return `<li class="country-item">
            <div class="country-wraper"><img class="country-img" src="${country.flags.svg}" width= "50mpx"  alt="${country.name.official}"/>
            <h2 class="country-name"><b>${country.name.official}</b></h2></div>
            <p class = "country-capital"><b>Capital</b> : ${country.capital}</p>
            <p><b>Population</b> : ${country.population}</p>
            <p><b>Languages</b> : ${Object.values(country.languages)}</p>
            </li>`
 }).join('')

countryList.innerHTML = markup;
}