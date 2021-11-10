import { API_URL_CODE, API_SEARCH_CODE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  country: {},
  search: {
    query: "",
    results: [],
  },
  favourites: [],
};

export const loadCountry = async function (id) {
  try {
    const data = await getJSON(`${API_URL_CODE}${id}`);

    const country = data[0];
    
    state.country = {
      id: country.cca2,
      name: country.name.common,
      offName: country.name.official,
      capital: country.capital[0],
      flag: country.flags.png,
      region: country.region,
      pop: country.population
    };

    if (state.favourites.some((fave) => fave.id === id)) {
      state.country.favourited = true;
    } else {
      state.country.favourited = false;
    }

    
  } catch (error) {
    console.error(`${error} *ERROR from loadCountry()*`);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  state.search.query = query;
  try {
    const data = await getJSON(`${API_SEARCH_CODE}${query}`);
    state.search.results = data.map((ctry) => {
      return {
        id: ctry.cca2,
        name: ctry.name.common,
        flag: ctry.flags.png,
      };
    });
  } catch (error) {}
};

const persistFavourites = function(){
  localStorage.setItem('faves', JSON.stringify(state.favourites))
}

export const addFavourite = function (country) {
  // addd favourite
  state.favourites.push(country);

  // mark current country as favourited
  if (country.id === state.country.id) {
    state.country.favourited = true;
  }
  persistFavourites()
};

export const deleteFavourite = function (id) {
  const index = state.favourites.findIndex(el => el.id === id)
  state.favourites.splice(index, 1)

  // mark current country as unfavourited
  if (id === state.country.id) {
    state.country.favourited = false;
  }
  persistFavourites()
}

const init = function () {
  const storage = localStorage.getItem('faves')
  if(storage) {
    state.favourites = JSON.parse(storage)
  }
}

init()
console.log(state.favourites)