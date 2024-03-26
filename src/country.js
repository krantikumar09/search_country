// Function to parse URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Get the country name parameter from the URL
var countryName = getUrlParameter("name");

// Fetch data.json to get country details
fetch("/data.json")
  .then((response) => response.json())
  .then((data) => {
    // Find the country with the specified name
    var country = data.find((country) => country.name === countryName);

    if (country) {
      const countryDetails = document.createElement("div");
      countryDetails.classList.add(
        "country-details",
        "grid",
        "md:grid-cols-2",
        "grid-cols-1",
        "gap-5"
      );
      // Display country details
      countryDetails.innerHTML = `
          <div>
            <img src="${country.flags.svg}" alt="flag" />
          </div>
          <div class="country-details-content">
            <h2 class="country-card-name text-3xl font-extrabold mb-4">${
              country.name
            }</h2>
            <div class="country-detail-col columns-1 sm:columns-2">
              <p class="text-base mb-1.5"><strong>Native Name: </strong>${
                country.nativeName
              }</p>
              <p class="text-base mb-1.5"><strong>Population: </strong>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p class="text-base mb-1.5"><strong>Region: </strong>${
                country.region
              }</p>
              <p class="text-base mb-1.5"><strong>Sub Region: </strong>${
                country.subregion
              }</p>
              <p class="text-base mb-1.5"><strong>Capital: </strong>${
                country.capital
              }</p>
              <p class="text-base mb-1.5"><strong>Top Level Domain: </strong>${
                country.topLevelDomain
              }</p>
              <p class="text-base mb-1.5"><strong>Currencies: </strong>${country.currencies
                .map((currency) => currency.name)
                .join(", ")}</p>
              <p class="text-base mb-1.5"><strong>Languages: </strong>${country.languages
                .map((language) => language.name)
                .join(", ")}</p>
            </div>
            <div class="border-countries mt-8">
              <p><strong>Border Countries: </strong></p>
              ${
                country.borders && country.borders.length > 0
                  ? country.borders
                      .map((border) => {
                        // Find the full name of the border country
                        var borderCountry = data.find(
                          (country) => country.alpha3Code === border
                        );
                        return `<a href="/country.html?name=${encodeURIComponent(
                          borderCountry.name
                        )}"><button class="country-btn text-sm font-normal">${border}</button></a>`;
                      })
                      .join("")
                  : "No border countries available"
              }
            </div>
          </div>
        `;

      document
        .querySelector(".country-details-container")
        .append(countryDetails);
    } else {
      // Country not found
      document.querySelector(".country-details-container").innerText =
        "Country not found: " + countryName;
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
