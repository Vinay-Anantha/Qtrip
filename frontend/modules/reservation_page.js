import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const response = await fetch("http://127.0.0.1:8082/reservations/");
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

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  if (reservations.length === 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } else {
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";
  }
  reservations.forEach((res) => {
    console.log(document.getElementById(res.id));
    const renderHook = document.getElementById("reservation-table");
    const trElem = document.createElement("tr");

    let transactionID = document.createElement("th");
    transactionID.textContent = res.id;

    let bookingName = document.createElement("td");
    bookingName.textContent = res.name;

    let adventureName = document.createElement("td");
    adventureName.textContent = res.adventureName;

    let personCount = document.createElement("td");
    personCount.textContent = res.person;

    let reservedDate = document.createElement("td");
    reservedDate.textContent = new Date(res.date).toLocaleDateString("en-IN");

    let price = document.createElement("td");
    price.textContent = res.price;

    let bookingTime = document.createElement("td");
    let options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    };
    bookingTime.textContent = new Date(res.time).toLocaleString(
      "en-IN",
      options
    );

    let action = document.createElement("td");
    action.id = res.id;
    action.classList.add("reservation-visit-button");
    action.innerHTML = `<a href="/frontend/pages/adventures/detail/?adventure=${res.adventure}">Visit Adventure</a>`;

    trElem.append(
      transactionID,
      bookingName,
      adventureName,
      personCount,
      reservedDate,
      price,
      bookingTime,
      action
    );
    renderHook.append(trElem);
  });
}

export { fetchReservations, addReservationToTable };
