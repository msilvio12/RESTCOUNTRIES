const searchInput = document.getElementById("searchInput");
const countryList = document.getElementById("countryList");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm.length >= 2) {
    searchCountries(searchTerm);
  } else {
    clearCountryList();
  }
});



async function searchCountries(searchTerm) {
  clearCountryList();
  
  try {
    const response = await fetch(`https://restcountries.com/v2/name/${searchTerm}`);
    const countries = await response.json();

    
    
    countries.forEach(country => {
      const li = document.createElement("li");
      li.textContent = country.name;
      li.addEventListener("click", () => {
        showCountryInfo(country);
      });
      countryList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function showCountryInfo(country) {
  
  alert(`Country Name: ${country.name}\nPopulation: ${country.population}\nRegion: ${country.region}`);
}

function clearCountryList() {
  while (countryList.firstChild) {
    countryList.removeChild(countryList.firstChild);
  }
}
