const dataUrl = "../data.json";
let countriesData = [];

function handleTheme() {
  document.body.classList.toggle("dark-theme");
}

// Fetch data from JSON file
fetch(dataUrl)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((data) => {
    countriesData = data;
    displayData(data);
    populateRegionList(data);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

const countryContainer = document.getElementById("countryContainer");
const regionBox = document.querySelector(".region-box");
const regionListDisplay = document.querySelector(".region-list");

// Function to handle clicks on country cards
countryContainer.addEventListener("click", function (event) {
  // Check if the clicked element is a country card
  if (event.target.classList.contains("country-card-name")) {
    // Get the country name from the clicked card
    const countryName = event.target.innerText;
    // Redirect to country.html with the country name as URL parameter
    window.location.href = `/country.html?name=${encodeURIComponent(
      countryName
    )}`;
  }
});

// Function to display country cards
function displayData(countries) {
  countryContainer.innerHTML = ""; // Clear previous content
  countries.forEach((country) => {
    const countryCard = createCountryCard(country);
    countryContainer.appendChild(countryCard);
  });
}

// Function to create a country card element
function createCountryCard(country) {
  const countryCard = document.createElement("a");
  countryCard.href = `/country.html?name=${country.name}`;
  countryCard.classList.add("country-card");

  countryCard.innerHTML = `
    <div class="country-card-inner">
      <img src="${
        country.flags.svg
      }" alt="" class="flag-img w-full h-[200px] object-cover">
      <div class="country-card-content h-full -mt-[6px] px-8 py-6 grow">
        <h2 class="country-card-name font-extrabold text-xl mb-5">${
          country.name
        }</h2>
        <p class="text-base mb-1.5"><strong>Population:</strong> ${country.population.toLocaleString(
          "en-IN"
        )}</p>
        <p class="text-base mb-1.5"><strong>Region:</strong> ${
          country.region
        }</p>
        <p class="text-base mb-1.5"><strong>Capital:</strong> ${
          country.capital
        }</p>
      </div>
    </div>
  `;

  return countryCard;
}

// Function to populate the region list
function populateRegionList(data) {
  const regions = [...new Set(data.map((country) => country.region))];
  regions.forEach((region) => {
    const listItem = document.createElement("li");
    listItem.textContent = region;
    listItem.onclick = () => filterByRegion(region);
    regionListDisplay.appendChild(listItem);
  });
}

// Function to filter countries by region
function filterByRegion(region) {
  regionBox.firstElementChild.innerHTML = region;
  const filteredCountries = countriesData.filter(
    (country) => country.region === region
  );
  displayData(filteredCountries);
}

// Search functionality
const searchBox = document.getElementById("search");
const suggestions = document.getElementById("suggestions");

searchBox.addEventListener("input", () => {
  const query = searchBox.value.trim();
  searchCountries(query);
});

function searchCountries(query) {
  const searchItem = query.toLowerCase();
  const filteredCountries = countriesData.filter((country) =>
    country.name.toLowerCase().includes(searchItem)
  );
  displayData(filteredCountries);
  displaySearchSuggestions(filteredCountries);
}

function displaySearchSuggestions(countries) {
  suggestions.innerHTML = "";

  if (countries.length > 0) {
    const suggestionList = document.createElement("ul");

    countries.forEach((country) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.textContent = country.name;
      suggestionItem.addEventListener("click", () => {
        searchBox.value = country.name;
        suggestions.innerHTML = "";
      });
      suggestionList.appendChild(suggestionItem);
    });

    suggestions.appendChild(suggestionList);
  }
}

// Dark mode toggle
function handleTheme() {
  document.body.classList.toggle("dark-theme");
  const isDarkMode = document.body.classList.contains("dark-theme");
  const moonIcon = document.querySelector("header i");

  if (isDarkMode) {
    moonIcon.classList.add("fa-solid");
    moonIcon.classList.remove("fa-regular");
  } else {
    moonIcon.classList.remove("fa-solid");
    moonIcon.classList.add("fa-regular");
  }
}

const regionList = document.querySelector(".region-list");

function handleRegionList() {
  regionList.classList.toggle("active");
}

function populateRegionList(data) {
  const regions = [...new Set(data.map((country) => country.region))];
  regions.forEach((region) => {
    const listItem = document.createElement("li");
    listItem.textContent = region;
    listItem.onclick = () => filterByRegion(region);
    regionListDisplay.appendChild(listItem);
  });
}

function filterByRegion(region) {
  const selectedRegion = region;
  regionBox.firstElementChild.innerHTML = selectedRegion;
  handleRegionList();
  countryContainer.innerHTML = "";
  const filteredCountries = countriesData.filter(
    (country) => country.region === region
  );
  displayData(filteredCountries);
}

document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".region-list");
  const regionBox = document.querySelector(".region-box");
  if (!dropdown.contains(event.target) && !regionBox.contains(event.target)) {
    dropdown.classList.remove("active");
  }
});

// close regionlist after clicking on the body
document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".region-list");
  const regionBox = document.querySelector(".region-box");
  if (!dropdown.contains(event.target) && !regionBox.contains(event.target)) {
    dropdown.classList.remove("active");
  }
});

document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".region-list");
  const regionBox = document.querySelector(".region-box");
  if (!dropdown.contains(event.target) && !regionBox.contains(event.target)) {
    dropdown.classList.remove("active");
  }
});
