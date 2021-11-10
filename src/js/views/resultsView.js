import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".search-results");
  _errorMessage = "No country found for that search term! Please try again..."
  _successMessage = "Success!..."

  _generateHTML() {
      return this._data.map(this._generateHTMLPreview).join('')
  }

  _generateHTMLPreview(result){
    const id = window.location.hash.slice(1)
    return `<a href="#${result.id}" class="result-link">
        <div class="search-results-holder">
        <div class="search-results-flag-round">
        <img src="${result.flag}"/></div>
        <div class="search-results-country-name">${result.name}</div>
    </div>
    </a>
    `;
  }
}

export default new ResultsView();
