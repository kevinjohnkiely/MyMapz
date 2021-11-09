import { API_URL_CODE, API_SEARCH_CODE } from './config.js'
import { getJSON } from './helpers.js';

export const state = {
  country: {},
  search: {
    query: '',
    results: []
  }
};

export const loadCountry = async function (id) {
  try {
    
    const data = await getJSON(`${API_URL_CODE}${id}`)

    const country = data[0];
    state.country = {
      id: country.cca2,
      name: country.name.common,
      offName: country.name.official,
      capital: country.capital[0],
      flag: country.flags.png,
      region: country.region,
      neighbours: country.borders
    };
    console.log(state.country);
  } catch (error) {
    console.error(`${error} *ERROR from loadCountry()*`)
      throw error
  }
};

export const loadSearchResults = async function(query){
  state.search.query = query
  try {
    const data = await getJSON(`${API_SEARCH_CODE}${query}`)
    state.search.results = data.map(ctry => {
      return {
        id: ctry.cca2,
        name: ctry.name.common,
        flag: ctry.flags.png
      }
    })
    
  } catch (error) {
    
  }
}