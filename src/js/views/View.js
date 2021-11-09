import errorLogo from '../../img/error.png'

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const html = this._generateHTML();
    this._clearHTML();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _clearHTML() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const html = `
        <div class="loader">Loading...</div>
        `;
    this._clearHTML();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderError(message = this._errorMessage) {
    const html = `<div class="country-error">
      <div class="error-icon">
      <img src="${errorLogo}" alt="Error Occurred!" />
      </div>
      <h3>${message}</h3>
      </div>`;
    this._clearHTML();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderSuccess(message = this.successMessage) {
    const html = `<div class="country-error">
      <div class="error-icon">
      <img src="${errorLogo}" alt="Success" />
      </div>
      <h3>${message}</h3>
      </div>`;
    this._clearHTML();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
}
