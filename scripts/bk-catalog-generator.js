const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;
const SECONDS_PER_WEEK = SECONDS_PER_DAY * 7;
const URL_AUDIOBOOKS = "https://librivox.org/api/feed/audiobooks/?";
const DATE = new Date(Date.now());
const DATE_IN_TEXT = `${
  DATE.getMonth() + 1
} ${DATE.getDate()}, ${DATE.getFullYear()}`;
const DATE_IN_SECONDS = Math.round(
  Date.UTC(DATE.getFullYear(), DATE.getMonth(), DATE.getDate()) / 1000
);
const back1day = DATE_IN_SECONDS - SECONDS_PER_DAY;
const back7days = DATE_IN_SECONDS - SECONDS_PER_WEEK;
let catURL = "https://cors-anywhere.herokuapp.com/" + URL_AUDIOBOOKS + "limit=10&extended=1&fields={title,authors,description}&format=json&since=";
let local = "text/audiobooks10-ext.json";
let numOfDays = 0;

function check() {
  if (typeof local != "undefined") latestBooks(local);
  else latestBooks(catURL + DATE_IN_SECONDS);
}

function latestBooks(url = catURL + DATE_IN_SECONDS) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.error || res.books.length < 10) {
        numOfDays++;
        console.log(
          "cycle number " +
            numOfDays +
            " and " +
            (res.error ? " 0 " : res.books.length) +
            " books"
        );

        return latestBooks(
          catURL + (DATE_IN_SECONDS - SECONDS_PER_DAY * numOfDays)
        );
      }
      const app = document.getElementById("root");
      const container = document.createElement("div");
      container.setAttribute("class", "container");
      app.appendChild(container);

      pubDate = document.createElement("p");
      pubDate.textContent =
        res.books.length +
        " Books published since " +
        new Date((DATE_IN_SECONDS - SECONDS_PER_DAY * numOfDays) * 1000);
      container.appendChild(pubDate);

      for (x of res.books) {
        items = document.createElement("div");
        items.setAttribute("class", "bk-items");
        bk_info = document.createElement("div");
        bk_info.setAttribute("class", "bk-info");
      // bk_cover = document.createElement("div");
        title = document.createElement("h4");
        desc = document.createElement("p");
        word = document.createElement("p");
        author = document.createElement("h5");
        title.textContent = x.title;
        word.textContent = "by";
        author.textContent =
          x.authors[0].first_name + " " + x.authors[0].last_name;
        desc.textContent = x.description;
        container.appendChild(items);
        items.appendChild(bk_info);
        bk_info.appendChild(title);
        bk_info.appendChild(word);
        bk_info.appendChild(author);
        bk_info.appendChild(desc);
      }
    });
}
