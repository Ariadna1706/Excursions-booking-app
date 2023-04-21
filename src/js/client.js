import "./../css/client.css";

import ExcursionsAPI from "./ExcursionsAPI";

console.log("client");
const apiUrl = "http://localhost:3000/excursions";
const liProto = document.querySelector(".excursions__item--prototype");
const ulEl = document.querySelector(".panel__excursions");

document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("DOM admin");
  loadExcursions();
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

function insertExcursion(excursionsArr) {
  excursionsArr.forEach((item) => {
    const liElement = liProto.cloneNode(true);
    ulEl.appendChild(liElement);
    liElement.classList.remove("excursions__item--prototype");
    const headerEl = liElement.firstElementChild;
    const cityName = headerEl.firstElementChild;
    cityName.textContent = item.name;
    const description = headerEl.lastElementChild;
    description.textContent = item.description;
   
    
   
   
  });
}

const excursionForm = document.querySelector(".excursions__form");

excursionForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const orderArr = getParicipantsNumber();

  const summaryUlElement = document.querySelector(".panel__summary");

  const summaryItem = createSummaryItems();
  summaryUlElement.appendChild(summaryItem);
  createBasketWithPrices(summaryItem, orderArr);

  //ustawienie usunięcia opcji z koszyka

  const summaryheading = summaryItem.firstElementChild;
  const removeBtn = summaryheading.lastElementChild;
  removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target) {
      summaryItem.remove();
    }
  });

  //sumowanie danych z koszyka

  const basketPrice = removeBtn.previousElementSibling;
  basketPrice.textContent = `${orderArr[0] * 99 + orderArr[1] * 50}PLN`;

  // wyliczanie całkowitej kwoty

  console.log(e.target);

  const totalPriceSummary = document.querySelector(".order__total-price-value");
  totalPriceSummary.textContent = parseInt(basketPrice.textContent);
});

function getParicipantsNumber() {
  const formElements = [...excursionForm.elements];
  const [adultNumber, childNumber] = formElements;
  const order = [+adultNumber.value, +childNumber.value];
  return order;
}

function createSummaryItems() {
  const summaryItemProto = document.querySelector(".summary__item--prototype");
  const summaryItem = summaryItemProto.cloneNode(true);
  summaryItem.classList.remove("summary__item--prototype");
  return summaryItem;
}

function createBasketWithPrices(summaryItem, orderArr) {
  const basket = summaryItem.lastElementChild;
  basket.textContent = `dorośli: ${orderArr[0]} x ${99}PLN
  dzieci: ${orderArr[1]} x ${50}PLN `;
  return basket;
}
