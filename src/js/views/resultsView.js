import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".search-results");
  _errorMessage = "No country found for that search term! Please try again..."
  _successMessage = "Success!..."

  _generateHTML() {
      return this._data.map(this._generateHTMLPreview).join('')
  }

  _generateHTMLPreview(result){
    return `
        <div class="search-results-holder">
        <div class="search-results-flag-round">
        <a href="#${result.id}"><img src="${result.flag}"/></a></div>
        <div class="search-results-country-name">${result.name}</div>
    </div>
    `;
  }
}

export default new ResultsView();
