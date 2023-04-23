import "./../css/admin.css";

import ExcursionsAPI from "./ExcursionsAPI";

const api = new ExcursionsAPI();

const liProto = document.querySelector(".excursions__item--prototype");
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
  api
    .loadData()
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
    const [name, description, adultPrice, childPrice] = e.target.elements;
    const data = createDatatoInsert(name, description, adultPrice, childPrice);
    fillExcursionFormChecker(errors, name, description, adultPrice, childPrice);
    const ulEl = document.querySelector(".errors");
    clearHTML(ulEl);

    if (errors.length > 0) {
      errors.forEach((err) => {
        const liElement = document.createElement("li");
        liElement.innerText = err;
        ulEl.appendChild(liElement);
      });
    } else {
      api
        .addData(data)
        .catch((err) => console.error(err))
        .finally(loadExcursions);
      clearFormData(name, description, adultPrice, childPrice);
    }
  });
}

function insertExcursion(excursionsArr) {
  clearHTML(ulEl);

  excursionsArr.forEach((item) => {
    const liElement = liProto.cloneNode(true);
    ulEl.appendChild(liElement);
    liElement.classList.remove("excursions__item--prototype");
    const headerEl = liElement.firstElementChild;
    const cityName = headerEl.firstElementChild;
    const description = headerEl.lastElementChild;
    // description.textContent = item.description;
    const liForm = liElement.lastElementChild;
    const liLabel = liForm.querySelectorAll("span");
    const adultPrice = liLabel[0];
    const childPrice = liLabel[1];
    liElement.dataset.id = item.id;

    cityName.innerHTML = ` <span>${item.name}</span> `;
    description.innerHTML = ` <span>${item.description}</span> `;
    adultPrice.innerHTML = ` <span>${+item.adultPrice}</span>`;
    childPrice.innerHTML = ` <span>${+item.childPrice}</span>`;
  });
}

function removeExcursions() {
  ulEl.addEventListener("click", (e) => {
    e.preventDefault();

    const targetEl = e.target;

    console.log(targetEl);
    // problem z działaniem tej funkcji
    if (targetEl.value === "usuń") {
      const id = ulEl.firstElementChild.dataset.id;
      console.log(id);
      api
        .removeData(id)
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

    if (targetEl.className.includes("excursions__field-input--update")) {
      const buttons = targetEl.parentElement;
      const form = buttons.parentElement;
      const liEl = form.parentElement;

      const spanList = liEl.querySelectorAll("span");
      console.log(spanList);

      const isEditable = [...spanList].every((span) => span.isContentEditable);

      if (isEditable) {
        const id = liEl.dataset.id;
        console.log(id);
        const data = {
          name: spanList[0].textContent,
          description: spanList[1].textContent,
          adultPrice: spanList[2].textContent,
          childPrice: spanList[4].textContent,
        };

        api
          .updateData(id, data)
          .then((resp) => console.log(resp))
          .catch((err) => console.error(err))
          .finally(() => {
            spanList.forEach((span) => (span.contentEditable = false));
            spanList.forEach((span) => (span.style.color = "white"));
            targetEl.value = "edytuj";
          });
      } else {
        targetEl.value = "zapisz";
        spanList.forEach((span) => (span.contentEditable = true));
        spanList.forEach((span) => (span.style.color = "blue"));
      }
    }
  });
}

const createDatatoInsert = function (
  cityName,
  TripDescription,
  adultCost,
  childCost
) {
  const data = {
    name: cityName.value,
    description: TripDescription.value,
    adultPrice: adultCost.value,
    childPrice: childCost.value,
  };
  return data;
};

function clearFormData(dataToClear1, dataToClear2, dataToClear3, dataToClear4) {
  dataToClear1.value = "";
  dataToClear2.value = "";
  dataToClear3.value = "";
  dataToClear4.value = "";
}

function clearHTML(element) {
  element.innerHTML = "";
}

function fillExcursionFormChecker(
  arr,
  name,
  description,
  adultPrice,
  childPrice
) {
  if (name.value === "") {
    arr.push("Nazwa: to pole jest obowiązkowe");
  }

  if (description.value === "") {
    arr.push("Opis: to pole jest obowiązkowe");
  }
  if (adultPrice.value === "") {
    arr.push("Cena dorosły: to pole jest obowiązkowe");
  }
  if (childPrice.value === "") {
    arr.push("Cena dzecko: to pole jest obowiązkowe");
  }
}
