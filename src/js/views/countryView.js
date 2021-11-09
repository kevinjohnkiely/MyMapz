import View from './View.js';

class CountryView extends View {
  _parentElement = document.querySelector(".country-container");
  
  _errorMessage = "No country found! Please try again..."
  _successMessage = "Success!..."

 

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateHTML() {
    return `
    <div class="country-container-header">
          <h2>${this._data.name} (${this._data.offName})</h2>
      </div>
      <div class="country-container-content">
          <div class="country-flag"><img src="${this._data.flag}" alt="${
      this._data.name
    }"></div>
          <div class="country-details">
            <ul>
                <li>Continent: <strong>${this._data.region}</strong></li>
                <li>Capital: <strong>${this._data.capital}</strong></li>
                <li>Neighbours: ${this._data.neighbours
                  ?.map((nbour) => {
                    return `${nbour}, `;
                  })
                  .join("")}</li>
            </ul>
          </div>
      </div>
    `;
  }
}

export default new CountryView();
