const getCityLatt = async (latt,long) => {
    const corAPI = `https://cors-anywhere.herokuapp.com/`;
    const API = `https://www.metaweather.com//api/location/search/?lattlong=${latt},${long}`;
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
      console.log("Existe un error en getCityWoeID", err);
    }
  };
  
  export default getCityLatt;
  