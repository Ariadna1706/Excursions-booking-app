class ExcursionsAPI {
  constructor() {
    this.urlExcursions = "http://localhost:3000/excursions";
    this.urlOrders = "http://localhost:3000/orders";
  }

  _fetch(options, additionalPath = "") {
    const url = this.urlExcursions + additionalPath;
    return fetch(url, options).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(resp);
    });
  }

  load() {
    return this._fetch();
  }

  add(data) {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    return this._fetch(options);
  }

  remove(id) {
    const options = { method: "DELETE" };
    return this._fetch(options, `/${id}`);
  }

  update(id, data) {
    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    return this._fetch(options, `/${id}`);
  }

  _fetchOrders(options) {
    return fetch(this.urlOrders, options).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(resp);
    });
  }

  addOrders(orderBasket) {
    const options = {
      method: "POST",
      body: JSON.stringify(orderBasket),
      headers: { "Content-Type": "application/json" },
    };
    return this._fetchOrders(options);
  }
}

export default ExcursionsAPI;
