import "./../css/admin.css";

import ExcursionsAPI from "./ExcursionsAPI";

const adminPanel = document.querySelector(".panel");
const formSection = adminPanel.querySelector(".form");
const liProto = document.querySelector(".excursions__item--prototype");
const apiUrl = "http://localhost:3000/excursions";
const ulEl = document.querySelector(".panel__excursions");

document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("DOM admin");
  loadExcursions();
  addExcursions();
  removeExcursions();
  updateExcursions();
}

function loadExcursions() {
  fetch(apiUrl)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(resp);
    })
    .then((data) => {
      insertExcursion(data);
    })
    .catch((err) => console.error(err));
}

function addExcursions() {
  const form = document.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errors = [];

    const name = e.target.elements[0];
    const description = e.target.elements[1];
    const adultPrice = e.target.elements[2];
    const childPrice = e.target.elements[3];

    const data = {
      name: name.value,
      description: description.value,
      adultPrice: adultPrice.value,
      childPrice: childPrice.value,
    };

    if (name.value === "") {
      errors.push("Nazwa: to pole jest obowiązkowe");
    }

    if (description.value === "") {
      errors.push("Opis: to pole jest obowiązkowe");
    }
    if (adultPrice.value === "") {
      errors.push("Cena dorosły: to pole jest obowiązkowe");
    }
    if (childPrice.value === "") {
      errors.push("Cena dzecko: to pole jest obowiązkowe");
    }
    const ulEl = document.querySelector(".errors");

    if (errors.length > 0) {
      ulEl.innerText = "";

      errors.forEach(function (err) {
        const liElement = document.createElement("li");
        liElement.innerText = err;
        ulEl.appendChild(liElement);
      });
    } else {
      ulEl.innerText = "";
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      };
      fetch(apiUrl, options)
        .then((resp) => console.log(resp))
        .catch((err) => console.error(err))
        .finally(loadExcursions);

      name.value = "";
      description.value = "";
      adultPrice.value = "";
      childPrice.value = "";
    }

    console.log(errors);
  });
}

function insertExcursion(excursionsArr) {
  ulEl.innerHTML = "";

  excursionsArr.forEach((item) => {
    const liElement = liProto.cloneNode(true);
    ulEl.appendChild(liElement);
    liElement.classList.remove("excursions__item--prototype");
    const headerEl = liElement.firstElementChild;
    const cityName = headerEl.firstElementChild;
    cityName.textContent = item.name;
    const description = headerEl.lastElementChild;
    description.textContent = item.description;
    const liForm = liElement.lastElementChild;
    const liLabel = liForm.querySelectorAll("strong");
    const adultPrice = liLabel[0];
    // adultPrice.textContent = +item.adultPrice;
    const childPrice = liLabel[1];
    //childPrice.textContent = +item.childPrice;
    liElement.dataset.id = item.id;

    adultPrice.innerHTML = `
    <span>${+item.adultPrice}</span>
    `;

    childPrice.innerHTML = `
    <span>${+item.childPrice}</span>
    `;
  });
}

function removeExcursions() {
  ulEl.addEventListener("click", (e) => {
    e.preventDefault();

    const targetEl = e.target;

    if (targetEl.value === "usuń") {
      const id = ulEl.firstElementChild.dataset.id;
      const options = { method: "DELETE" };
      fetch(`${apiUrl}/${id}`, options)
        .then((resp) => console.log(resp))
        .catch((err) => console.error(err))
        .finally(loadExcursions);
    }
  });
}

function updateExcursions() {
  ulEl.addEventListener("click", (e) => {
    e.preventDefault();

    const targetEl = e.target;

    if (targetEl.value === "edytuj") {
      const buttons = targetEl.parentElement;
      const form = buttons.parentElement;
      const liEl = form.parentElement;
      const spanList = form.querySelectorAll("span");

      const isEditable = [...spanList].every((span) => span.isContentEditable);

      if (isEditable) {
        const id = liEl.dataset.id;
        console.log(id);
        const data = {
          adultPrice: spanList[0].textContent,
          childPrice: spanList[1].textContent,
        };

        console.log(data);

        const options = {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/${id}`, options)
          .then((resp) => console.log(resp))
          .catch((err) => console.error(err))
          .finally(() => {
            spanList.forEach((span) => (span.contentEditable = false));
            targetEl.value = "edytuj";
          });
      } else {
        targetEl.value = "zapisz";
        spanList.forEach((span) => (span.contentEditable = true));
      }
    }
  });
}
