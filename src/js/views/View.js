import errorLogo from "../../img/error.png";

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const html = this._generateHTML();
    this._clearHTML();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  // update(data) {
  //   this._data = data;
  //   const newMarkup = this._generateMarkup();

  //   const newDOM = document.createRange().createContextualFragment(newMarkup);
  //   const newElements = Array.from(newDOM.querySelectorAll('*'));
  //   const curElements = Array.from(this._parentElement.querySelectorAll('*'));

  //   newElements.forEach((newEl, i) => {
  //     const curEl = curElements[i];
  //     // console.log(curEl, newEl.isEqualNode(curEl));

  //     // Updates changed TEXT
  //     if (
  //       !newEl.isEqualNode(curEl) &&
  //       newEl.firstChild?.nodeValue.trim() !== ''
  //     ) {
  //       // console.log('💥', newEl.firstChild.nodeValue.trim());
  //       curEl.textContent = newEl.textContent;
  //     }

  //     // Updates changed ATTRIBUES
  //     if (!newEl.isEqualNode(curEl))
  //       Array.from(newEl.attributes).forEach(attr =>
  //         curEl.setAttribute(attr.name, attr.value)
  //       );
  //   });
  // }

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
