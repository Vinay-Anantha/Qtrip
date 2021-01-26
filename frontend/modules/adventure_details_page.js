import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);

  return params.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try {
    const response = await fetch(
      `http://127.0.0.1:8082/adventures/detail?adventure=${adventureId}`
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

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent =
    adventure.subtitle;
  document.getElementById("adventure-content").textContent = adventure.content;
  const renderHook = document.getElementById("photo-gallery");
  adventure.images.forEach((img) => {
    const imgElem = document.createElement("img");
    imgElem.src = img;
    imgElem.className = "activity-card-image";
    renderHook.append(imgElem);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoID = document.querySelector("#photo-gallery");
  photoID.innerHTML = `
  <div id="adventureImageCarousel" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    
  </ol>
  <div class="carousel-inner">

  </div>
  <a class="carousel-control-prev" href="#adventureImageCarousel" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#adventureImageCarousel" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
  `;

  images.forEach((img, index) => {
    document.querySelector(".carousel-inner").insertAdjacentHTML(
      "beforeend",
      `
    <div class="carousel-item">
      <img src="${img}" class="d-block w-100" alt="adventure carousel image">
    </div>`
    );
    document.querySelector(".carousel-indicators").insertAdjacentHTML(
      "beforeend",
      `
  <li data-target="#adventureImageCarousel" data-slide-to="${index}"></li>`
    );
  });
  document
    .querySelector("#adventureImageCarousel > ol > li:nth-child(1)")
    .classList.add("active");
  document
    .querySelector("#adventureImageCarousel > div > div:nth-child(1)")
    .classList.add("active");
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-person-cost").textContent =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent =
    persons * adventure.costPerHead;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  $("#myForm").submit((event) => {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://65.1.51.2:8082/reservations/new",
      dataType: "JSON",
      data: $("#myForm").serialize() + `&adventure=${adventure.id}`,
      success: function () {
        alert("Success!");
        location.reload();
      },
      error: function () {
        alert("Failed!");
      }
    });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved
};
