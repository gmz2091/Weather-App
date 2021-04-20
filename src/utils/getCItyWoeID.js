const getCityWoeID = async (woeid) => {
    const corAPI = `https://cors-anywhere.herokuapp.com/`;
    const API = `https://www.metaweather.com/api/location/${woeid}`;
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
      console.log(err);
    }
  };
  
  export default getCityWoeID;
  