const getWeather = async (city) => {
  const div = document.getElementById("temperature");
  const corAPI = `https://cors-anywhere.herokuapp.com/`;
  const API = `https://www.metaweather.com/api/location/search/?query=${city}`;
  div.innerHTML = "";
  div.appendChild(Spinner());
  try {
    const urlAPI = `${corAPI}${API}`;
    const res = await fetch(urlAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = res.json();
    return data;
  } catch (err) {
    console.log("Existe un error", err);
  }
};

export default getWeather;

const Spinner = () => {
  const div = document.createElement("div");
  div.classList = "spinner";
  div.innerHTML = `
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
  `;
  return div;
};
