import view from "../view/main.html";
import getWeather from "../utils/getData";
import getCityWoeID from "../utils/getCItyWoeID";
import dataCity from "../locationNames.json";

const SearchLocation = async () => {
  const div = document.createElement("div");
  div.classList = "relative bg-cloud-img w-full md:w-2/5";
  div.innerHTML = view;
  const inputCity = div.querySelector("#locationForm");
  const locationNames = div.querySelector("#location_names");

  for (let i = 0; i < dataCity.length; i++) {
    const dataCityNames = `<option value="${dataCity[i]}"></option>`;
    locationNames.innerHTML += dataCityNames;
  }

  inputCity.addEventListener("submit", (e) => {
    e.preventDefault();
    CityLocation();
    inputCity.reset();
  });
  /*navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
  });*/
  return div;
};

export default SearchLocation;

const CityLocation = async () => {
  const divTemp = document.getElementById("temperature");

  const locationInput = document.getElementById("locationInput");
  const city = locationInput.value;
  divTemp.innerHTML = "";
  if (city == "") {
    return divTemp.appendChild(AlertErr());
  }
  const data = await getWeather(city);
  const titleCity = data.map((city) => city.title);
  const woeid = data.map((elements) => elements.woeid);
  const cityName = titleCity[0];
  const woeidCity = woeid[0];

  const wheather = await getCityWoeID(woeidCity);
  const the_temp = wheather.consolidated_weather[0].the_temp;

  const view = `
  <div class="text-white m-auto w-1/5 md:w-1/4 relative text-5xl flex flex-nowrap font-sans font-thin not-italic"> 
    <p>${the_temp.toPrecision(
      2
    )}</p><span class="text-2xl absolute -right-3 -bottom-2">°C</span>
  </div>  
  <div class="text-gray-300 left relative inset-x-14 flex flex-nowrap"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
    </svg></span><p class="text-lg">${cityName}</p>
  </div>
    
  `;
  divTemp.innerHTML = view;
  return divTemp;
};

const AlertErr = () => {
  const div = document.createElement("div");
  div.classList = "bg-red-300 mt-4 text-red-900 text-white px-4 py-2 rounded";
  div.innerHTML = `<p class="font-black font-serif">El campo esta vacio, Ingrese una opcion valida</p>`;
  setTimeout(() => {
    div.remove();
  }, 3000);
  return div;
};
