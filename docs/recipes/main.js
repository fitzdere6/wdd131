import recipes from "./recipes.mjs";

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getRandomListEntry(list) {
  return list[getRandomNumber(list.length)];
}

function getImagePath(image) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  if (image.startsWith("images/")) return image;
  return `images/${image}`;
}

function tagsTemplate(tags) {
  let html = `<ul class="recipe__tags">`;
  tags.forEach((tag) => {
    html += `<li>${tag}</li>`;
  });
  html += `</ul>`;
  return html;
}

function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    html += i <= rating
      ? `<span aria-hidden="true" class="icon-star">⭐</span>`
      : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  const src = getImagePath(recipe.image);
  return `
    <figure class="recipe">
      <img src="${recipe.image}" alt="${recipe.name}" />
      <figcaption>
        ${tagsTemplate(recipe.tags)}
        <h2><a href="#">${recipe.name}</a></h2>
        <p class="recipe__ratings">${ratingTemplate(recipe.rating)}</p>
        <p class="recipe__description">${recipe.description}</p>
      </figcaption>
    </figure>
  `;
}

function renderRecipes(recipeList) {
  const recipeSection = document.querySelector(".recipes");
  if (!recipeList || recipeList.length === 0) {
    recipeSection.innerHTML = `<p class="no-results">No recipes found. Try another search.</p>`;
    return;
  }
  recipeSection.innerHTML = recipeList.map(recipeTemplate).join("");
}

function init() {
  renderRecipes([getRandomListEntry(recipes)]);
}

init();

function filterRecipes(query) {
  query = query.toLowerCase();

  const filtered = recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.tags.find((tag) => tag.toLowerCase().includes(query)) ||
      recipe.ingredients.find((i) => i.toLowerCase().includes(query))
    );
  });

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
  event.preventDefault();
  const query = document
    .querySelector("#searchInput")
    .value.trim()
    .toLowerCase();
  if (query === "") {
    init();
    return;
  }
  renderRecipes(filterRecipes(query));
}

document
  .querySelector("#searchForm")
  .addEventListener("submit", searchHandler);
