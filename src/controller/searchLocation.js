import view from "../view/main.html";
import getWeather from "../utils/getData";
import getCityWoeID from "../utils/getCItyWoeID";
import dataCity from "../locationNames.json";
import hc from "../assets/img/hc.png";
import lc from "../assets/img/lc.png";
import s from "../assets/img/s.png";
import h from "../assets/img/h.png";
import hr from "../assets/img/hr.png";
import lr from "../assets/img/lr.png";
import sl from "../assets/img/sl.png";
import sn from "../assets/img/sn.png";
import t from "../assets/img/t.png";
import c from "../assets/img/c.png";
import getCityLatt from "../utils/getDataLatt";

const SearchLocation = async () => {
  const div = document.createElement("section");
  div.classList = "bg-gray-850 w-full md:grid md:grid-cols-9";
  div.innerHTML = view;
  const inputCity = div.querySelector("#locationForm");
  const locationNames = div.querySelector("#location_names");
  const side_menu = div.querySelector("#side_menu");
  const button_search = div.querySelector("#button_search");
  const button_search_close = div.querySelector("#button_search_close");

  div.querySelector("#find-me").addEventListener("click", geoFindMe);

  WeatherFromLocalStorage();

  button_search.addEventListener("click", () => {
    if (side_menu.classList.contains("-translate-x-full")) {
      return side_menu.classList.remove("-translate-x-full");
    }
  });

  button_search_close.addEventListener("click", () => {
    if (!side_menu.classList.contains("translate-x-full")) {
      return (side_menu.classList =
        "bg-gray-850 transform -translate-x-full transition-all easy-in w-full h-screen col-start-1 col-end-4 relative z-50");
    }
  });

  for (let i = 0; i < dataCity.length; i++) {
    const dataCityNames = `<option value="${dataCity[i]}"></option>`;
    locationNames.innerHTML += dataCityNames;
  }

  inputCity.addEventListener("submit", (e) => {
    e.preventDefault();
    CityLocation();
    inputCity.reset();
  });

  return div;
};

export default SearchLocation;

const CityLocation = async () => {
  const max_temp = document.querySelector("#max_temp");
  const min_temp = document.querySelector("#min_temp");
  const img_temp = document.querySelector("#img_temp");
  const divTemp = document.getElementById("temperature");
  const date_1 = document.getElementById("date_#1");
  const temperature_to_day = document.getElementById("temperature_to_day");
  const progress_bar_humidity = document.getElementById(
    "progress_bar_humidity"
  );
  const humidity_location = document.getElementById("humidity_location");
  const locationInput = document.getElementById("locationInput");
  const wind_speeds = document.getElementById("wind_speed");
  const air_pressures = document.getElementById("air_pressure");
  const visibilitys = document.getElementById("visibility");
  const city = locationInput.value;
  divTemp.innerHTML = "";
  temperature_to_day.innerHTML = "";
  temperature_to_day.appendChild(Spinner());

  if (city == "") {
    return divTemp.appendChild(AlertErr());
  }
  const data = await getWeather(city);
  const titleCity = data.map((city) => city.title);
  const woeid = data.map((elements) => elements.woeid);
  const cityName = titleCity[0];
  const woeidCity = woeid[0];
  //Number.parseInt(wind_speed)

  const wheather = await getCityWoeID(woeidCity);
  const humidity = wheather.consolidated_weather[0].humidity;
  progress_bar_humidity.style.width = `${humidity}%`;
  humidity_location.innerText = `${humidity}`;

  const mph = wheather.consolidated_weather[0].wind_speed;
  const mb = wheather.consolidated_weather[0].air_pressure;
  const miles = wheather.consolidated_weather[0].visibility;
  wind_speeds.innerText = Number.parseInt(mph);
  air_pressures.innerText = Number.parseInt(mb);
  visibilitys.innerText = Number.parseInt(miles);

  const idx = wheather.consolidated_weather.filter(
    (element, index) => index >= 1
  );

  const the_temp = wheather.consolidated_weather[0].the_temp;
  const weather_state_name =
    wheather.consolidated_weather[0].weather_state_name;

  const view = `
<div class="flex justify-center relative top-10">${weather_name_func(
    weather_state_name
  )}</div>
  <div class="text-white w-1/3 m-auto relative top-9 text-8xl flex justify-center font-sans"> 
    <p>${the_temp.toPrecision(
      2
    )}</p><span class="text-2xl absolute -right-2 -bottom-2"></span>
  </div>  
  <div class="text-gray-300 flex items-center justify-center mt-20 md:mt-36"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-2 text-gray-860" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
    </svg></span><p class="text-4xl text-white">${cityName}</p>
  </div>
  <div class="flex justify-center text-white absolute inset-x-0 bottom-4">
    <p>${weather_state_name}</p>
  </div>
  ${idx.map((elements) => {
    if (document.querySelector(".spinner")) {
      document.querySelector(".spinner").remove();
    }

    const datees = new Date(elements.applicable_date).toDateString();
    temperature_to_day.innerHTML += `<div class="w-full h-60 md:h-44 lg:h-52 bg-gray-850">
          <div class="flex justify-center mt-5 mb-2">
            <p class="text-white">${datees}</p>
          </div>
          <div class="flex justify-center mb-10">
          ${weather_name_func(elements.weather_state_name)}
          </div>
          <div class="flex justify-between w-10/12 m-auto">
            <p class="text-white">${elements.min_temp.toPrecision(2)}°C</p>
            <p class="text-gray-860">${elements.max_temp.toPrecision(2)}°C</p>
          </div>
        </div> `;
  })}
    
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
    lightCloud: lc,
    snow: sn,
    sleet: sl,
    hail: h,
    thunderstorm: t,
    heavyRain: hr,
    lightRain: lr,
    showers: s,
    heavyCloud: hc,
    clear: c,
  };

  switch (weather_state_name) {
    case "Light Cloud":
      return `<img class=" w-1/2 h-1/2" src="${weather_state_name_IMG.lightCloud}" alt="" />`;
    case "Snow":
      return `<img class=" w-1/2 h-1/2" src="${weather_state_name_IMG.snow}" alt="" />`;
    case "Sleet":
      return `<img class=" w-1/2 h-1/2" src="${weather_state_name_IMG.sleet}" alt="" />`;
    case "Hail":
      return `<img class=" w-1/2 h-1/2" src="${weather_state_name_IMG.hail}" alt="" />`;
    case "Thunderstorm":
      return `<img class=" w-1/2 h-1/2" src="${weather_state_name_IMG.thunderstorm}" alt="" />`;
    case "Heavy Rain":
      return `<img class=" w-1/2 h-1/2" src="${weather_state_name_IMG.heavyRain}" alt="" />`;
    case "Light Rain":
      return `<img class=" w-1/2 h-1/2" src="${weather_state_name_IMG.lightRain}" alt="" />`;
    case "Showers":
      return `<img class=" w-1/2 h-1/2" src="${weather_state_name_IMG.showers}" alt="" />`;
    case "Heavy Cloud":
      return `<img class=" w-1/2 h-1/2" src="${weather_state_name_IMG.heavyCloud}" alt="" />`;
    case "Clear":
      return `<img class=" w-1/2 h-1/2" src="${weather_state_name_IMG.clear}" alt="" />`;
    default:
      console.log("No existe");
      break;
  }
};

const geoFindMe = () => {
  const dataGeo = {};
  const id_temp = document.getElementById("id_temp");
  const success = async (position) => {
    const latitude = position.coords.latitude.toPrecision(4);
    const longitude = position.coords.longitude.toPrecision(5);

    console.log(latitude, longitude);

    const dataLatt = await getCityLatt(latitude, longitude);

    const woeidLatt = dataLatt[0].woeid;

    dataGeo.id = woeidLatt;
    dataGeo.latt = latitude;
    dataGeo.long = longitude;

    localStorage.setItem("Geo_Data", JSON.stringify(dataGeo));

    const data = await getCityWoeID(woeidLatt);
    id_temp.innerHTML = `<div class="flex justify-center relative top-10">${weather_name_func(
      data.consolidated_weather[0].weather_state_name
    )}</div>
    <div class="text-white w-1/3 m-auto relative top-9 text-8xl flex justify-center font-sans"> 
      <p>${data.consolidated_weather[0].the_temp.toPrecision(
        2
      )}</p><span class="text-2xl absolute -right-2 -bottom-2"></span>
    </div>  
    <div class="relative text-gray-300 flex items-center justify-center mt-12 md:mt-12"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-2 text-gray-860" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
      </svg></span><p class="text-4xl text-white">${data.title}</p>
      <div class="flex justify-center text-white absolute top-12">
      <p>You'r Location</p>
    </div>
    </div>
    <div class="flex justify-center text-white absolute inset-x-0 bottom-12">
      <p>${data.consolidated_weather[0].weather_state_name}</p>
    </div>`;
  };

  function error() {
    console.error("Unable to retrieve your location");
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

const Spinner = () => {
  const div = document.createElement("div");
  div.classList = "spinner";
  div.innerHTML = `
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
  `;
  return div;
};

const WeatherFromLocalStorage = async () => {
  const Geo_Data = JSON.parse(localStorage.getItem("Geo_Data"));

  if (Geo_Data !== null) {
    const { latt, long, id } = Geo_Data;
    const data = await getCityWoeID(id);
    id_temp.innerHTML = `<div class="flex justify-center relative top-10">${weather_name_func(
      data.consolidated_weather[0].weather_state_name
    )}</div>
      <div class="text-white w-1/3 m-auto relative top-9 text-8xl flex justify-center font-sans"> 
        <p>${data.consolidated_weather[0].the_temp.toPrecision(
          2
        )}</p><span class="text-2xl absolute -right-2 -bottom-2"></span>
      </div>  
      <div class="relative text-gray-300 flex items-center justify-center mt-12 md:mt-12"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-2 text-gray-860" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg></span><p class="text-4xl text-white">${data.title}</p>
        <div class="flex justify-center text-white absolute top-12">
        <p>You'r Location</p>
      </div>
      </div>
      <div class="flex justify-center text-white absolute inset-x-0 bottom-12">
        <p>${data.consolidated_weather[0].weather_state_name}</p>
      </div>`;
  } else {
    console.log("Geolocation is null");
  }
};
