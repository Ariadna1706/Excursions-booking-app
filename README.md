> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 

&nbsp;


# JavaScript: API oraz FETCH

## Wprowadzanie

Wracamy do naszego zlecenia związanego z wycieczkami. Tym razem postanowiliśmy przebudować kod wykorzystując nowo poznane informacje.

Podzielimy naszą aplikację na 2 części. 

### Client

Funkcjonalność związana z tym co może zrobić użytkownik tj.:
* wybrać wycieczkę poprzez wprowadzenie ilość zamawianych biletów w odpowiednie pole formularza i kliknięcie `dodaj do zamówienia`
    * walidacja danych
    * zamówienie jest dodawana do panelu z prawej strony tj. do koszyka
    * cena za całość jest aktualizowana
* potwierdzenie zamówienia poprzez wprowadzenie imienia, nazwiska oraz adresu email do pola zamówienia i kliknięcia `zamawiam`
    * walidacja danych
    * wysłanie zamówienia do bazy danych (u nas to będzie API uruchomione dzięki JSON Server)
    * wyczyszczenie "koszyka"

Pliki powiązane:
* `./src/index.html`
* `./src/js/client.js`
* `./src/css/client.css`

### Admin    
Panel zarządzania wycieczkami zapisanych w bazie danych: 
* dodawanie wycieczek
* usuwanie wycieczek
* modyfikowanie wycieczek

Pliki powiązane
* `./src/admin.html`
* `./src/js/admin.js`
* `./src/css/admin.css`

## Implementacja

### Webpack

W tym zadaniu wykorzystamy webpack-a, którego omawialiśmy przy materiale dotyczącym ES2015+. 

Zauważ, że posiada on dodatkową konfigurację, która obsługuje podział aplikacji na 2 cześci. Zwróć szczególną uwage na tzw. chunks.

Webpack również zajmuje się wczytaniem plików css (zobacz importy w `client.js` oraz `admin.js`) dzięki odpowiednim loader-om w `webpack.config.js` dla plików o rozszerzeniu `.css`. Style są wczytywane do `<head>` więc się nie zdziw, że pliki `css` nie są generowane.

Pamiętaj, aby zainstalować wszystkie zależności przed uruchomieniem webpack-a tj.
```
npm install
```
Potem dopiero możesz go uruchomić poprzez `npm start`.

Jeśli chcesz odpalić wersję `client` to wystarczy wpisać w przeglądarkę `http://localhost:8080/index.html` natomiast `admin` będzie dostępny pod adresem: `http://localhost:8080/admin.html`.

> **Uwaga!** Jeśli nie widzisz poprawnych "linii" błędów w konsoli to prawodpodobnie nie masz włączonej obsługi source maps dla plików JavaScript. Możesz to zmienić w [ustawieniach przeglądarki Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps).

### JSON Server

Podczas przerabiania materiałów zainstalowaliśmy globalnie JSON Server dlatego nie musimy go instalować - wystarczy, że go uruchomimy. Pamietaj, że bez jego uruchomienia nasze API nie będzie działać. 

Odpalamy kolejny terminal (webpack już jest uruchomiony w jednym) i przechodzimy do katalogu głównego z zadaniem. Następnie wpisujemy do terminala:
```
json-server --watch ./data/excursions.json
```

Od teraz API będzie dostępne pod adresem: http://localhost:3000, jednak zauważ, że w pliku mamy dwa różne zasoby tj.
* excursions
* orders

W zależności od tego na jakich danych będziesz chciał pracować to będziesz do `fetch()` przekazywać inny URL tj.
* http://localost:3000/excursions - zarządzanie wycieczkami
* http://localost:3000/orders - zarządzanie zamówieniami

### Fetch

Nasza komunikacja z uruchomionym API będzie się odbywać przy pomocy `fetch()`, który został opisany w przerabianych materiałach.

Choć `fetch()` jest mocno [wspierany przez najnowsze przeglądarki](https://caniuse.com/#feat=fetch) to nie powinniśmy zapominać o wsparciu dla starszych rozwiązań.

W takim przypadku możemy wykorzystać tzw. polyfill, który doda niewspieraną przez przeglądarkę funkcjonalność.

Możesz do tego wykorzystać [whatwg-fetch](https://github.com/github/fetch).

### ExcursionsAPI

W katalogu `./src/js` znajdziesz plik `ExcursionsAPI.js`, który zawiera klasę o tej samej nazwie.

Został on stworzony, aby przechowywać w jednym miejscu całą komunikację z API.

To tutaj powinny być zdefiniowane metody, które odpytują API np. pobieranie wycieczek czy ich dodawanie.

Ta klasa będzie używana po stronie `client` jak i `admin` dlatego też została ona zaimportowana do obu plików JS odpowiedzialnych za każdą z części.

### Prototypy

Zauważ, że w kodzie wystąpują prototypy (`.*--prototype`) są one używane tylko po to, aby ułatwić prezentację danych. 

Docelowo mają być one niewidoczne - możesz je ukryć przy pomocy CSS (`display: none`). Natomiast może warto je wykorzystać do skopiowania struktury kodu HTML, aby nie musieć tego robić w kodzie JS.

## Podsumowanie

Postaraj sie wykonać to zadanie w taki sposób, aby zarządzanie wycieczkami było wygodne, a ich zamawianie intuicyjnie. 

Miej cały czas z tyłu głowy myśl, że może kiedyś znów będzie trzeba przebudować lub wykorzystać w innym projekcie napisany kod dlatego powinien być on jak najbardziej elastyczny (zasada pojedyńczej odpowiedzialności).

Jeśli potrzebujesz to możesz zmodyfikować HTML oraz CSS, aby zwiększyć funkcjonalność całego rozwiązania.



&nbsp;

> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 
