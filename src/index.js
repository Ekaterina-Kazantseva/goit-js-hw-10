import './css/styles.css';
import { debounce } from "lodash"
import { Notify } from "notiflix"
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

Notify.info('Please start typing the name of any country IN ENGLISH');
searchInput.addEventListener('input', () => {
    const value = searchInput.value.trim()
    if (value !== '') { 
        debounce(findCountries(value), DEBOUNCE_DELAY)
    }
}) 
    
    function clearInput() {
        countryInfo.innerHTML = ''
        countryList.innerHTML = ''
    }

    function findCountries(name) {
        fetchCountries(name).then(response => {
            if (response === undefined) return
            if (response.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.")
                clearInput()
                return
            }
            if (response.length == 1) { countryInfoCretor(response[0]) }
            else { countryListCreate(response) }
        })
    }

    function countryInfoCretor(country) {
        clearInput()

        const name = country.name.official
        const capital = country.capital[0]
        const population = country.population
        const flag = country.flags.svg
        const languages = Object.values(country.languages)
        const element = `<ul style="list-style-type:none">
            <li style="font-size:50px;  margin-bottom: 10px">
            <img 
            style="width: 75px;"
            src="${flag}"
            alt="flag">
            <b>${name}</b></li>
            <li><b>Capital:</b> ${capital}</li>
            <li><b>Population:</b> ${population}</li>
            <li><b>Languages:</b> ${languages}</li>
        </ul>`
    
        countryInfo.insertAdjacentHTML('beforeend', element)
    }

    function countryListCreate(countries) {
        clearInput()
 
        const totalCountryList = countries.map(country => `<li style="display: flex;align-items: center;margin-bottom: 10px;">
        <img 
            style="width: 50px;"
            src="${country.flags.svg}"
            alt="flag">
            ${country.name.official}
        </li>`).join('')

        countryList.insertAdjacentHTML('beforeend', totalCountryList)
    }
