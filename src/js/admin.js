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
    .load()
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
        const liElement = createLiEl(err);
        addNewLiToDom(ulEl, liElement);
      });
    } else {
      api
        .add(data)
        .catch((err) => console.error(err))
        .finally(loadExcursions);
      clearFormData(name, description, adultPrice, childPrice);
    }
  });
}

function insertExcursion(excursionsArr) {
  clearHTML(ulEl);
  excursionsArr.forEach((item) => {
    const liElement = createLiClone(liProto);
    addNewLiToDom(ulEl, liElement);
    liElement.classList.remove("excursions__item--prototype");
    const headerEl = liElement.firstElementChild;
    const name = headerEl.firstElementChild;
    const description = headerEl.lastElementChild;
    const liForm = liElement.lastElementChild;
    const liLabel = findAllSpanElements(liForm);
    const [adultPrice, childPrice] = liLabel;
    liElement.dataset.id = item.id;
    addExcursionDataToHtml(name, description, adultPrice, childPrice, item);
  });
}

function removeExcursions() {
  ulEl.addEventListener("click", (e) => {
    e.preventDefault();
    const targetEl = e.target;
    if (targetEl.className.includes("excursions__field-input--remove")) {
      const id = targetEl.parentElement.parentElement.parentElement.dataset.id;
      api
        .remove(id)
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

      const spanList = findAllSpanElements(liEl);
      const isEditable = makeElementsEditable(spanList);
      const [cityName, description, priceAdult,, priceChildren] = spanList;

      if (isEditable) {
        const id = liEl.dataset.id;
        const data = dataToInsertInHtml(
          cityName,
          description,
          priceAdult,
          priceChildren,
        );

        console.log(data)
          console.log(spanList);

        api
          .update(id, data)
          .then((resp) => console.log(resp))
          .catch((err) => console.error(err))
          .finally(() => {
            toggleIsEditable(spanList, false);
            setInctiveFontColor(spanList);
            targetEl.value = "edytuj";
          });
      } else {
        targetEl.value = "zapisz";
        toggleIsEditable(spanList, true);
        setActiveFontColor(spanList);
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

const dataToInsertInHtml = function (
  cityName,
  TripDescription,
  adultCost,
  childCost
) {
  const data = {
    name: cityName.textContent,
    description: TripDescription.textContent,
    adultPrice: adultCost.textContent,
    childPrice: childCost.textContent,
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

const createLiEl = function (err) {
  const liElement = document.createElement("li");
  liElement.innerText = err;
  return liElement;
};

function addNewLiToDom(ul, li) {
  ul.appendChild(li);
}

const createLiClone = function (proto) {
  const liElement = proto.cloneNode(true);
  return liElement;
};

const findAllSpanElements = function (domEl) {
  const liLabel = domEl.querySelectorAll("span");
  return liLabel;
};

function addExcursionDataToHtml(
  name,
  description,
  adultPrice,
  childPrice,
  item
) {
  name.innerHTML = ` <span>${item.name}</span> `;
  description.innerHTML = ` <span>${item.description}</span> `;
  adultPrice.innerHTML = ` <span>${+item.adultPrice}</span>`;
  childPrice.innerHTML = ` <span>${+item.childPrice}</span>`;
}

const makeElementsEditable = function (arr) {
  const isEditable = [...arr].every((item) => item.isContentEditable);
  return isEditable;
};

function toggleIsEditable(arr, condition) {
  arr.forEach((span) => (span.contentEditable = condition));
}

function setActiveFontColor(arr) {
  arr.forEach((item) => (item.style.color = "blue"));
}

function setInctiveFontColor(arr) {
  arr.forEach((item) => (item.style.color = "white"));
}
