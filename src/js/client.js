import "./../css/client.css";

import ExcursionsAPI from "./ExcursionsAPI";
const api = new ExcursionsAPI();

console.log("client");

const liProto = document.querySelector(".excursions__item--prototype");
const ulEl = document.querySelector(".panel__excursions");
const summary = document.querySelector(".summary");
const summaryItem = document.querySelector(".summary__item--prototype");

document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("DOM admin");
  loadExcursions();
}

function loadExcursions() {
  api
    .loadData()
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
    const liForm = liElement.lastElementChild;
    const liLabel = liForm.querySelectorAll("span");
    const adultPrice = liLabel[0];
    adultPrice.textContent = +item.adultPrice;
    const childPrice = liLabel[1];
    childPrice.textContent = +item.childPrice;
  });
}

ulEl.addEventListener("submit", function (e) {
  const item = createBasket(e);

  const [adultInput, childInput] = e.target.elements;
  adultInput.value = "";
  childInput.value = "";

  const cart = document.querySelector(".cart");
  cart.style.display = "block"

  console.log(e.target);
  const summaryTrip = summaryItem.cloneNode(true);
  summaryTrip.classList.remove("summary__item--prototype");
  summary.appendChild(summaryTrip);
  const summaryTitle = summaryTrip.firstElementChild;
  const cityName = summaryTitle.firstElementChild;
  cityName.textContent = item.title;
  console.log(cityName.textContent);
  const totalPrice = cityName.nextElementSibling;
  totalPrice.textContent =
    priceSum(
      item.adultNumber,
      item.adultPrice,
      item.childNumber,
      item.childPrice
    ) + "PLN";
  console.log(item.childPrice);

  const summaryPrice = summaryTrip.lastElementChild;

  summaryPrice.textContent =
    "dorośli: " +
    item.adultNumber +
    " x " +
    item.adultPrice +
    "PLN, " +
    "dzieci: " +
    item.childNumber +
    " x " +
    item.childPrice +
    "PLN";

  const removebtn = totalPrice.nextElementSibling;
  removebtn.addEventListener("click", function (e) {
    e.preventDefault();
    summary.removeChild(summaryTrip);
    allTotalCostToPay();
  });
  allTotalCostToPay();
});

function allTotalCostToPay() {
  const priceToPay = document.querySelectorAll(
    "li:not(.summary__item--prototype) .summay__total-price"
  );
  console.log(priceToPay);
  let sum = 0;
  priceToPay.forEach(function (el) {
    sum += parseInt(el.textContent);
  });

  const orderPrice = document.querySelector(".order__total-price-value");
  orderPrice.textContent = sum + " PLN";
}

const createBasket = function (e) {
  e.preventDefault();

  const form = e.target;

  const adults = form.elements[0];
  const children = form.elements[1];

  const divAdult = form.firstElementChild;
  const labelAdult = divAdult.firstElementChild;
  const spanAdult = labelAdult.firstElementChild;
  const priceAdult = Number(spanAdult.textContent);

  const divChild = divAdult.nextElementSibling;
  const labelChild = divChild.firstElementChild;
  const spanChild = labelChild.firstElementChild;
  const priceChild = Number(spanChild.textContent);

  const item = {
    title: form.parentElement.querySelector(".excursions__title").textContent,
    adultNumber: Number(adults.value),
    adultPrice: priceAdult,
    childNumber: Number(children.value),
    childPrice: priceChild,
  };

  return item;
};

const priceSum = function (adultNum, adultPrice, childNum, childPrice) {
  const sum = adultNum * adultPrice + childNum * childPrice;
  return sum;
};

const panelOrder = document.querySelector(".panel__order");

panelOrder.addEventListener("submit", function (e) {
  e.preventDefault();

  const orderPrice = document.querySelector(
    ".order__total-price-value"
  ).textContent;

  const name = panelOrder.elements[0].value;
  const email = panelOrder.elements[1].value;
  const ulElement = document.querySelector(".error__list");
  const errors = [];

  if (name.length === 0) {
    errors.push("Imię i Nazwisko: to pole jest obowiązkowe");
  }

  if (!email.includes("@") || email.length === 0) {
    errors.push("Email: adres email musi zawierać znak @");
  }

  ulElement.textContent = "";

  if (errors.length > 0) {
    errors.forEach(function (err) {
      const liElement = document.createElement("li");
      liElement.innerText = err;
      ulElement.appendChild(liElement);
    });
  } else {
    const orderBasket = {
      name: name,
      email: email,
      orderPrice: orderPrice,
    };

    api
      .addOrders(orderBasket)
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err));

    alert(
      "Dziękujemy za złożenie zamówienia o wartości " +
        orderPrice +
        ". Szczegóły zamówienia zostały wysłane na adres e-mail: " +
        email
    );

    const summaryItem = document.querySelectorAll(
      "li:not(.summary__item--prototype).summary__item"
    );

    summaryItem.forEach((item) => {
      item.parentElement.removeChild(item);
    });

    panelOrder.elements[0].value = "";
    panelOrder.elements[1].value = "";
    const test = document.querySelector(".order__total-price-value");

    test.textContent = "0PLN";
  }
});
