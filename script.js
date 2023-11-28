const Key = "n3CtCr9jwDg71lNneyFrBbqB7qORd69eBlENTZyLe4o";
const formel = document.querySelector("form");
const inputel = document.getElementById("Search-input");
const searchresults = document.querySelector(".search-results");
const showmore = document.getElementById("Show-more-button");
let inputdata = "";
let page = 1;
async function searchimages() {
  inputdata = inputel.value;
  const url = `https://api.unsplash.com/search/photos?pages=${page}&query=${inputdata}&client_id=${Key}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchresults.innerHtml = "";
  }
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imagelink = document.createElement("a");
    imagelink.href = result.links.html;
    imagelink.target = "_blank";
    imagelink.textContent = result.alt_description;

    imageWrapper.append(image);
    imageWrapper.append(imagelink);
    searchresults.append(imageWrapper);
  });

  page++;
  if (page > 1) {
    showmore.style.display = "block";
  }
}

formel.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchresults.innerHTML = ""
  searchimages();
});
showmore.addEventListener("click", () => {
  searchimages();
});
