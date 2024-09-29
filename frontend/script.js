window.addEventListener("load", () => fetchNews("India"));

const url = "https://newsdata.io/api/1/news";
const API_KEY = "pub_548399906b6b89f3115ffb862dd5f2be4b761";
function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  try {
    const response = await fetch(`${url}?apikey=${API_KEY}&q=${query}`);
    const result = await response.json();
    console.log(result);
    if (result.status === "success") {
      bindData(result.results);
    }
  } catch (error) {
    console.error(error);
  }
  // const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  // const data = await res.json();
  // console.log(data);
  // if (data.articles) bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    // if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.image_url;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.pubDate).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.creator} ◽ ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.link, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});