import view from "../view/main.html";
import getWeather from "../utils/getData";
import getCityWoeID from "../utils/getCItyWoeID";

const SearchLocation = async () => {
  const div = document.createElement("div");
  div.classList = "relative w-4/5 md:w-1/6 top-5 left-5";
  div.innerHTML = view;
  const inputCity = div.querySelector("#locationForm");

  inputCity.addEventListener("submit", (e) => {
    e.preventDefault();
    CityLocation();
    inputCity.reset();
  });
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
  });
  return div;
};

export default SearchLocation;

const CityLocation = async () => {
  const divTemp = document.getElementById("temperature");

  const locationInput = document.getElementById("locationInput");
  const city = locationInput.value;
  const data = await getWeather(city);
  const titleCity = data.map((city) => city.title);
  const woeid = data.map((elements) => elements.woeid);
  const cityName = titleCity[0];
  const woeidCity = woeid[0];

  const wheather = await getCityWoeID(woeidCity);
  const the_temp = wheather.consolidated_weather[0].the_temp;

  console.log("La temperatura actual es de ", the_temp.toPrecision(2), "°C");
  wheather.consolidated_weather.map((elements) =>
    console.log(elements.applicable_date)
  );
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
