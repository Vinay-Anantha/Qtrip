import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);

  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(
      `http://127.0.0.1:8082/adventures/?city=${city}`
    );
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

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    const renderHook = document.getElementById("data");
    const template = document.querySelector("template");
    const card = document.importNode(template.content, true);
    card.querySelector("a").setAttribute("href", `detail/?adventure=${key.id}`);
    card.querySelector("a").id = key.id;
    card.querySelector("img").setAttribute("src", key.image);
    card.querySelector("img").setAttribute("alt", `${key.name} image`);
    card.querySelector("h5").textContent = key.category;
    card.querySelector("div:nth-child(1) > span:nth-child(1)").textContent =
      key.name;
    card.querySelector(
      "div:nth-child(1) > span:nth-child(2)"
    ).textContent = `₹${key.costPerHead}`;
    card.querySelector("div:nth-child(2) > span:nth-child(1)").textContent =
      "Duration";
    card.querySelector(
      "div:nth-child(2) > span:nth-child(2)"
    ).textContent = `${key.duration} Hours`;
    renderHook.append(card);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const listFilteredByDuration = list.filter(
    (i) => i.duration >= low && i.duration <= high
  );
  return listFilteredByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const listFilteredByCategory = list.filter((i) =>
    categoryList.includes(i.category)
  );
  return listFilteredByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  if (filters.duration && filters.category.length !== 0) {
    const categoryList = filterByCategory(list, filters.category);
    return extractNum(categoryList, filters.duration);
  } else if (filters.category.length !== 0) {
    return filterByCategory(list, filters.category);
  } else if (filters.duration) {
    return extractNum(list, filters.duration);
  } else {
    return list;
  }
}
function extractNum(list, str) {
  const reg = /\d+/g;
  const numArr = str.match(reg);

  return filterByDuration(list, parseInt(numArr[0]), parseInt(numArr[1]));
}
//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  localStorage.setItem("filters", JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format

  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(adventures, filters) {
  const durationSelect = document.getElementById("duration-select");
  const durationSelectOptionArr = Array.from(
    durationSelect.querySelectorAll("option")
  );
  const ind = durationSelectOptionArr.findIndex((item) => {
    return parseInt(filters.duration) === parseInt(item.text);
  });
  document.getElementById("duration-select").selectedIndex =
    ind === -1 ? 0 : ind;

  filters.category.forEach((i) => {
    const divElem = document.createElement("div");
    divElem.className = "category-filter";
    const spanElem = document.createElement("span");
    spanElem.textContent = i;
    const iElem = document.createElement("i");
    iElem.textContent = `X`;
    iElem.className = "Xclass";
    divElem.append(spanElem);
    divElem.append(iElem);
    document.getElementById("category-list").append(divElem);

    const xButton = divElem.querySelector("i");
    xButton.addEventListener("click", () => {
      document.getElementById("data").textContent = "";
      document.getElementById("category-list").textContent = "";
      const index = filters["category"].indexOf(
        xButton.previousSibling.textContent
      );
      if (index > -1) {
        filters["category"].splice(index, 1);
      }
      generateFilterPillsAndUpdateDOM(adventures, filters);
      addAdventureToDOM(filterFunction(adventures, filters));
      saveFiltersToLocalStorage(filters);
    });
  });
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM
};
