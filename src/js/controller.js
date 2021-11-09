import * as model from "./model.js";
import countryView from "./views/countryView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

if(module.hot) {
  module.hot.accept();
}

const controlCountries = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    countryView.renderSpinner();
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
    
  } catch (error) {
    console.log(error);
  }
};

controlSearchResults();

const init = function () {
  countryView.addHandlerRender(controlCountries);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
