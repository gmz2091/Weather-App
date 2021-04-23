import view from "../view/main.html";
import getWeather from "../utils/getData";
import getCityWoeID from "../utils/getCItyWoeID";
import dataCity from "../locationNames.json";

const SearchLocation = async () => {
  const div = document.createElement("section");
  div.classList = "bg-gray-850 bg-img-cloud w-full md:grid md:grid-cols-9";
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
  const weather_state_name =
    wheather.consolidated_weather[0].weather_state_name;
  console.log(weather_state_name);

  const view = `
<div class="flex justify-center relative top-10">${weather_name_func(
    weather_state_name
  )}</div>
  <div class="text-white w-1/5 m-auto relative top-9 text-8xl flex justify-center font-sans"> 
    <p>${the_temp.toPrecision(
      2
    )}</p><span class="text-2xl absolute -right-2 -bottom-2">°C</span>
  </div>  
  <div class="text-gray-300 flex items-center justify-center mt-20 md:mt-36"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-2 text-gray-860" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
    </svg></span><p class="text-4xl text-white">${cityName}</p>
  </div>
  <div class="flex justify-center text-white absolute inset-x-0 bottom-4">
    <p>${weather_state_name}</p>
  </div>
    
  `;
  divTemp.innerHTML = view;
  return divTemp;
};

const AlertErr = () => {
  const div = document.createElement("div");
  div.classList =
    "bg-red-300 ml-4 mt-10 w-4/5 text-red-900 text-white px-4 py-2 rounded";
  div.innerHTML = `<p class="font-black font-serif">El campo esta vacio, Ingrese una opcion valida</p>`;
  setTimeout(() => {
    div.remove();
  }, 3000);
  return div;
};

const weather_name_func = (weather_state_name) => {
  const weather_state_name_IMG = {
    lightCloud: "https://www.metaweather.com/static/img/weather/lc.svg",
    snow: "https://www.metaweather.com/static/img/weather/sn.svg",
    sleet: "https://www.metaweather.com/static/img/weather/sl.svg",
    hail: "https://www.metaweather.com/static/img/weather/h.svg",
    thunderstorm: "https://www.metaweather.com/static/img/weather/t.svg",
    heavyRain: "https://www.metaweather.com/static/img/weather/hr.svg",
    lightRain: "https://www.metaweather.com/static/img/weather/lr.svg",
    showers: "https://www.metaweather.com/static/img/weather/s.svg",
    heavyCloud: "https://www.metaweather.com/static/img/weather/hc.svg",
    clear: "https://www.metaweather.com/static/img/weather/c.svg",
  };

  switch (weather_state_name) {
    case "Light Cloud":
      return `<img class="w-52" src="${weather_state_name_IMG.lightCloud}" alt="" />`;
    case "Snow":
      return `<img class="w-52" src="${weather_state_name_IMG.snow}" alt="" />`;
    case "Sleet":
      return `<img class="w-52" src="${weather_state_name_IMG.sleet}" alt="" />`;
    case "Hail":
      return `<img class="w-52" src="${weather_state_name_IMG.hail}" alt="" />`;
    case "Thunderstorm":
      return `<img class="w-52" src="${weather_state_name_IMG.thunderstorm}" alt="" />`;
    case "Heavy Rain":
      return `<img class="w-52" src="${weather_state_name_IMG.heavyRain}" alt="" />`;
    case "Light Rain":
      return `<img class="w-52" src="${weather_state_name_IMG.lightRain}" alt="" />`;
    case "Showers":
      return `<img class="w-52" src="${weather_state_name_IMG.showers}" alt="" />`;
    case "Heavy Cloud":
      return `<img class="w-52" src="${weather_state_name_IMG.heavyCloud}" alt="" />`;
    case "Clear":
      return `<img class="w-52" src="${weather_state_name_IMG.clear}" alt="" />`;
    default:
      console.log("No existe");
      break;
  }
};
