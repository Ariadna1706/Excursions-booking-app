# Excursions Booking App


This project is a small web application created to manage excursions sell online. 


The Application has two panels (client panel and admin panel)


**Main features**:


**admin panel allows to:**
- load excursions from API 
- add new excursions 
- remove excursions 
- modify excursions  

![screen](https://github.com/Ariadna1706/Excursions-booking-app/blob/main/src/img/screen1.png)


**client panel allows to:**
- load excursions from API 
- choose excursion 
- provide the number of participants 
- make an order 
- send the order to API


![screen](https://github.com/Ariadna1706/Excursions-booking-app/blob/main/src/img/screen2.png)


&nbsp;
 
## 💡 Technologies

[![My Skills](https://skillicons.dev/icons?i=js,html,css,webpack,json )](https://skillicons.dev)

&nbsp;

## 💿 Installation

The project uses [node](https://nodejs.org/en/), [npm](https://www.npmjs.com/) and [JSONServer](https://www.npmjs.com/package/json-server). Having them installed, type into the terminal: `npm i` and `npm install json-server -g`.


&nbsp;
 
## 🤔 Solutions provided in the project

- use of Fetch API and Promise Object 

some example code: 

```class ExcursionsAPI {
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
}
```


- use of **JSONServer** to be able to work with **API**
- use GET, POST, DELETE, PUT actions   
- code refactoring 
- use of **Webpack** to be able to use all ECMAScript2015 solutions
- use of **ECMAScript 2015** solutions (for example : template strings, destructuring, spread operator ect)



&nbsp;

## 🙋‍♂️ Feel free to contact me
I'm aspiring junior web developer, I'm deeply interested in web design, UX/UI and web development. One of may strength is constant willingnes to learn and develop my skills. If you would like to contact me you can find me on [LinkedIn](https://www.linkedin.com/in/ariadna-nicieja/)

&nbsp;

## 👏 Special thanks / Credits
Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) – for providing me with this task and for code review.

