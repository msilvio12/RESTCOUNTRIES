const searchInput = document.getElementById("searchInput");
const countryList = document.getElementById("countryList");
const countryInfoContainer = document.getElementById("countryInfo");

searchInput.addEventListener("input", async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm.length >= 2) {
    const countries = await searchCountries(searchTerm);
    updateCountryList(countries);
  } else {
    clearCountryList();
    clearCountryInfo();
  }
});

async function searchCountries(searchTerm) {
  try {
    const response = await fetch(`https://restcountries.com/v2/name/${searchTerm}`);
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

function updateCountryList(countries) {
  clearCountryList();
  countries.forEach(country => {
    const li = createListItem(country);
    countryList.appendChild(li);
  });
}

function createListItem(country) {
  const li = document.createElement("li");
  li.textContent = country.name;
  li.addEventListener("click", () => {
    showCountryInfo(country);
  });
  return li;
}