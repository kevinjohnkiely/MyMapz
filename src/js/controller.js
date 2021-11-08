const countryContainer = document.querySelector(".country-container");

const renderSpinner = function (parentEl) {
  const html = `
    <div class="loader">Loading...</div>
    `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", html);
};

const showCountry = async function () {
  try {
      const id = window.location.hash.slice(1)
      if(!id) return
    // 1 - Loading the country
    renderSpinner(countryContainer)
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
    const data = await res.json();
    console.log(res, data);
    if (!res.ok) throw new Error(`${data.message} *** (${res.status})`);

    let country = data[0];
    country = {
      id: country.cca2,
      name: country.name.common,
      offName: country.name.official,
      capital: country.capital[0],
      flag: country.flags.png,
      region: country.region,
      neighbours: country.borders,
    };
    console.log(country);
    // 2 - Rendering the country
    const html = `
        <div class="country-container-header">
              <h2>${country.name} (${country.offName})</h2>
          </div>
          <div class="country-container-content">
              <div class="country-flag"><img src="${country.flag}"></div>
              <div class="country-details">
                <ul>
                    <li>Continent: <strong>${country.region}</strong></li>
                    <li>Capital: <strong>${country.capital}</strong></li>
                    <li>Neighbours: ${country.neighbours
                      ?.map((nbour) => {
                        return `${nbour}, `;
                      })
                      .join("")}</li>
                </ul>
              </div>
          </div>
        `;
    countryContainer.innerHTML = "";
    countryContainer.insertAdjacentHTML("afterbegin", html);
  } catch (error) {
    alert(error);
  }
};

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showCountry))