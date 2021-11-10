import * as model from "./model.js";
import countryView from "./views/countryView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import favouritesView from "./views/favouritesView.js";

if(module.hot) {
  module.hot.accept();
}

// favouritesView.render(model.state.favourites)

const controlCountries = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    countryView.renderSpinner();
    favouritesView.render(model.state.favourites)

    // 1 - Loading the country
    await model.loadCountry(id);

    // 2 - Rendering the country
    countryView.render(model.state.country);
  } catch (error) {
    countryView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    
    // 1 - get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner()

    // 2 - load search results
    await model.loadSearchResults(query);

    // 3 - render results
    resultsView.render(model.state.search.results)
    // resultsView.update(model.state.search.results)
    
  } catch (error) {
    console.log(error);
  }
};

const controlAddFavourite = function(){

  //  1 add/remove favourte

  if(!model.state.country.favourited) {
    model.addFavourite(model.state.country)
  } else {
    model.deleteFavourite(model.state.country.id)
  }
  
  // 2 - update country view
  countryView.render(model.state.country)

  // 3 - render favourites
  favouritesView.render(model.state.favourites)
}

const controlFavourites = function(){
  favouritesView.render(model.state.favourites)
}

const init = function () {
  favouritesView.addHandlerRender(controlFavourites)
  countryView.addHandlerRender(controlCountries);
  searchView.addHandlerSearch(controlSearchResults);
  countryView.addHandlerFavourite(controlAddFavourite)
};

init();