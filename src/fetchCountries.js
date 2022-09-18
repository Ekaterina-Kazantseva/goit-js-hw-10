import { Notify } from "notiflix"
export function fetchCountries(name) {
    const url = 'https://restcountries.com/v3.1/name/'
    const filter = '?fields=name,capital,population,flags,languages'
    
      return fetch(`${url}${name.trim()}${filter}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        }).catch(error => {
            Notify.failure(`Oops, there is no country with that name`)
        })
}