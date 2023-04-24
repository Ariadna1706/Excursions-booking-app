import "./../css/client.css";

import ExcursionsAPI from "./ExcursionsAPI";
const api = new ExcursionsAPI();

console.log("client");

const liProto = document.querySelector(".excursions__item--prototype");
const ulEl = document.querySelector(".panel__excursions");
const summary = document.querySelector(".summary");
const summaryItem = document.querySelector(".summary__item--prototype");
const cart = document.querySelector(".cart");
let cartDis;

document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("DOM admin");
  loadExcursions();
}

function loadExcursions() {
  api
    .load()
    .then((data) => {
      insertExcursion(data);
    })
    .catch((err) => console.error(err));
}

function insertExcursion(excursionsArr) {
  excursionsArr.forEach((item) => {
    const liElement = createLiClone(liProto);
    addNewElToDom(ulEl, liElement);
    liElement.classList.remove("excursions__item--prototype");
    const headerEl = liElement.firstElementChild;
    const name = headerEl.firstElementChild;
    const description = headerEl.lastElementChild;
    const liForm = liElement.lastElementChild;
    const liLabel = findAllSpanElements(liForm);
    const adultPrice = liLabel[0];
    const childPrice = liLabel[1];
    addExcursionDataToHtml(name, description, adultPrice, childPrice, item);
  });
}

ulEl.addEventListener("submit", function (e) {
  const item = createBasket(e);

  const [adultInput, childInput] = e.target.elements;
  clearComandFormData(adultInput, childInput);
  cartDisplay(cart, (cartDis = "block"));

  const summaryTrip = summaryItem.cloneNode(true);
  summaryTrip.classList.remove("summary__item--prototype");
  addNewElToDom(summary, summaryTrip);
  const summaryTitle = summaryTrip.firstElementChild;
  const cityName = summaryTitle.firstElementChild;
  cityName.textContent = item.title;
  const totalPrice = cityName.nextElementSibling;
  totalPrice.textContent =
    priceSum(
      item.adultNumber,
      item.adultPrice,
      item.childNumber,
      item.childPrice
    ) + "PLN";

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

  fillExcursionFormChecker(errors, name, email);

  clearHTML(ulElement);

  if (errors.length > 0) {
    errors.forEach(function (err) {
      const liElement = document.createElement("li");
      liElement.innerText = err;
      addNewElToDom(ulElement, liElement);
    });
  } else {
    const orderBasket = {
      name: name,
      email: email,
      orderPrice: orderPrice,
    };

    console.log(orderBasket);
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

    clearComandFormData(panelOrder.elements[0], panelOrder.elements[1]);
    const priceValue = document.querySelector(".order__total-price-value");
    priceValue.textContent = "0PLN";

    cartDisplay(cart, (cartDis = "none"));
  }
});

const createLiClone = function (proto) {
  const liElement = proto.cloneNode(true);
  return liElement;
};

function addNewElToDom(ul, li) {
  ul.appendChild(li);
}

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
  name.innerHTML = item.name;
  description.innerHTML = item.description;
  adultPrice.innerHTML = +item.adultPrice;
  childPrice.innerHTML = +item.childPrice;
}

function clearComandFormData(dataToClear1, dataToClear2) {
  dataToClear1.value = "";
  dataToClear2.value = "";
}

function clearHTML(element) {
  element.innerHTML = "";
}

function fillExcursionFormChecker(arr, name, email) {
  if (name.length === 0) {
    arr.push("Imię i Nazwisko: to pole jest obowiązkowe");
  }

  if (!email.includes("@") || email.length === 0) {
    arr.push("Email: adres email musi zawierać znak @");
  }
}

function cartDisplay(cart, cartDis = "none") {
  cart.style.display = cartDis;
}
