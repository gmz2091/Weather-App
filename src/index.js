import "tailwindcss/tailwind.css";
import "../src/assets/styles/spinner.css";
import SearchLocation from "./controller/searchLocation";

const App = async () => {
  const main = null || document.getElementById("main");
  main.appendChild(await SearchLocation());
};

window.addEventListener("load", App);
