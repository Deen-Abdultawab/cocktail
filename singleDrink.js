import get from './src/getElement.js'

const detailDom = get('.single-container');
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

async function fetchData() {
  detailDom.innerHTML = `
  <section class="loading">
    <img src="./loading.gif" alt="loading" />
  </section>`
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id);

    const response = await fetch(`${url}${id}`);
    const data = await response.json();
    return data;
    
  } catch (error) {
    detailDom.innerHTML = `
    <h2 class="title">There was an error...</h2>`
  }
}

function displayHTML(data){
  console.log(data.drinks);
  const drinks = data.drinks[0];
  // image, title, description, ingredients, 
  const {strDrink:title, strDrinkThumb: image, strInstructions: desc} = drinks

  const list = [drinks.strIngredient1, drinks.strIngredient2, drinks.strIngredient3, drinks.strIngredient4, drinks.strIngredient5];

  document.title = title.toUpperCase();

  const listDom = list.map((item) => {
    if(!item) return;
    return `<li><i class="far fa-check-square">${item}</i></li>`
  }).join('')

  console.log(list)

  detailDom.innerHTML = `
  <section class="single-drink">
      <img src="${image}" alt="${title}" class="drink-img"/>
      <article class="drink-info">
        <h2 class="drink-name">${title}</h2>
        <p class="drink-desc">${desc}</p>
        <ul class="drink-ingredients">${listDom}</ul>
        <a href="index.html" class="btn">all cocktails</a>
      </article>
    </section>
  `
}

async function start(){
  const data = await fetchData();
  displayHTML(data);
}

start()