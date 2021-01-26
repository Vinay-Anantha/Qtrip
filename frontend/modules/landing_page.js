import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  try {
    const response = await fetch("http://127.0.0.1:8082/cities");
    if (response.status >= 200 && response.status <= 299) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      throw Error(response.statusText);
    }
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const renderHook = document.getElementById("data");
  const template = document.querySelector("template");
  const card = document.importNode(template.content, true);
  card.querySelector("a").setAttribute("href", `pages/adventures/?city=${id}`);
  card.querySelector("a").id = id;
  card.querySelector("img").setAttribute("src", image);
  card.querySelector("img").setAttribute("alt", `${city} image`);
  card.querySelector("h4").textContent = city;
  card.querySelector("h5").textContent = description;
  renderHook.append(card);
}

export { init, fetchCities, addCityToDOM };
