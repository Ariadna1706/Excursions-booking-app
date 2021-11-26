
> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 

&nbsp;


# JavaScript: API oraz FETCH

## Wprowadzenie

Wracamy do naszego zlecenia związanego z wycieczkami. Chcemy przebudować kod, wykorzystując nowo poznane informacje.

Dzielimy naszą aplikację na dwie części. 

### Client

To część związana z tym, co może zrobić użytkownik:
* wybrać wycieczkę przez wprowadzenie ilości zamawianych biletów w odpowiednie pola formularza i kliknięcie `dodaj do zamówienia`. Wiąże się to z:
    * walidacją danych
    * dodawaniem zamówienia do panelu z prawej strony, tj. do koszyka
    * aktualizowaniem ceny za całość
* potwierdzić zamówienie poprzez wprowadzenie imienia, nazwiska oraz adresu email do pola zamówienia i kliknięcie `zamawiam`. Wiąże się to z:
    * walidacją danych
    * wysłaniem zamówienia do bazy danych (u nas to będzie API uruchomione dzięki JSON Server)
    * wyczyszczeniem koszyka.

Pliki powiązane:
* `./src/index.html`
* `./src/js/client.js`
* `./src/css/client.css`

### Admin    
Panel zarządzania wycieczkami zapisanymi w bazie danych. Jego funkcjonalności to: 
* dodawanie wycieczek
* usuwanie wycieczek
* modyfikowanie wycieczek.

Pliki powiązane:
* `./src/admin.html`
* `./src/js/admin.js`
* `./src/css/admin.css`

## Implementacja

### Webpack

W tym zadaniu wykorzystamy webpacka, którego omawialiśmy w materiale dotyczącym ES2015+. 

Zauważ, że posiada on dodatkową konfigurację, która obsługuje podział aplikacji na dwie części. Zwróć szczególną uwagę na tzw. [chunki](https://webpack.js.org/glossary/#c).

Webpack zajmuje się również wczytaniem plików CSS (zobacz importy w `client.js` oraz `admin.js`) – dzieje się to dzięki odpowiednim loaderom dla plików o rozszerzeniu `.css` w `webpack.config.js`. Style są wczytywane do `<head>`, więc nie zdziw się, że pliki CSS nie są generowane.

Pamiętaj, aby przed uruchomieniem webpacka zainstalować wszystkie zależności komendą
```
npm install
```
Potem dopiero możesz go uruchomić poprzez `npm start`.

Jeśli chcesz odpalić wersję `client`, to wystarczy wpisać w przeglądarkę `http://localhost:8080/index.html`. Natomiast `admin` jest dostępny pod adresem: `http://localhost:8080/admin.html`.

> **Uwaga!** Jeśli nie widzisz poprawnych numerów linii kodu dla błędów w konsoli, to prawdopodobnie nie masz włączonej obsługi source maps dla plików JavaScript. Możesz to zmienić w [ustawieniach przeglądarki Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps).

### JSON Server

Podczas przerabiania materiałów zainstalowaliśmy globalnie JSON Server, dlatego teraz wystarczy, że go uruchomimy. Pamiętaj, że bez tego nasze API nie będzie działać. 

Odpalamy kolejny terminal (webpack już jest uruchomiony w jednym) i przechodzimy do katalogu głównego z zadaniem. Następnie wpisujemy do terminala:
```
json-server --watch ./data/excursions.json
```

Od teraz API będzie dostępne pod adresem: http://localhost:3000. Zauważ jednak, że w pliku mamy dwa różne zasoby, czyli:
* excursions
* orders.

W zależności od tego, na jakich danych będziesz chciał pracować, do `fetch()` przekażesz inny URL, tj.:
* http://localost:3000/excursions – zarządzanie wycieczkami
* http://localost:3000/orders – zarządzanie zamówieniami.

### Fetch

Nasza komunikacja z uruchomionym API będzie się odbywać przy pomocy `fetch()`, który został opisany w materiałach tego modułu.

Choć `fetch()` jest [wspierany przez najnowsze przeglądarki](https://caniuse.com/#feat=fetch), to nie powinniśmy zapominać o wsparciu dla tych starszych.

W takim przypadku możemy wykorzystać tzw. [polyfill](https://pl.wikipedia.org/wiki/Polyfill), który doda niewspieraną przez przeglądarkę funkcjonalność.

Możesz do tego wykorzystać [whatwg-fetch](https://github.com/github/fetch).

### ExcursionsAPI

W katalogu `./src/js` znajdziesz plik `ExcursionsAPI.js`, który zawiera klasę o tej samej nazwie.

Został on stworzony, aby przechowywać w jednym miejscu całą komunikację z API.

To tutaj powinny być zdefiniowane metody, które odpytują API, np. pozwalają pobrać wycieczki z bazy lub je do niej dodać.

Ta klasa będzie używana zarówno po stronie `client`, jak i `admin`, dlatego też została już zaimportowana do obu plików JS odpowiedzialnych za każdą z części.

### Prototypy

Zauważ, że w kodzie występują prototypy (`.*--prototype`). Są one używane tylko po to, aby ułatwić prezentację danych.

Docelowo mają być one niewidoczne – możesz je ukryć przy pomocy CSS (`display: none`). Warto je jednak wykorzystać do skopiowania struktury kodu HTML, aby nie musieć budować jej od podstaw w kodzie JS.

## Podsumowanie

Postaraj się wykonać to zadanie w taki sposób, aby zarządzanie wycieczkami było wygodne, a ich zamawianie intuicyjnie. 

Miej cały czas z tyłu głowy, że może kiedyś nasz kod znów będzie trzeba przebudować lub wykorzystać w innym projekcie, dlatego powinien on być jak najbardziej elastyczny (zasada pojedynczej odpowiedzialności), a nazwy plików, klas i metod – dopasowane do zawartości i logiki działania tych elementów (tzw. [samodokumentujący się kod](https://en.wikipedia.org/wiki/Self-documenting_code)).

Jeśli uznasz to za słuszne, możesz zmodyfikować kod HTML i CSS, aby zwiększyć funkcjonalność całego rozwiązania.


&nbsp;

> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 
