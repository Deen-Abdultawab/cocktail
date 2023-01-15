import get from './src/getElement.js'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

const cocktailDom = get('.section');
const formInput = get('[name="drink"]');
const form = get('.search-form');

async function fetchData(source){
  cocktailDom.innerHTML = `
  <article class="loading">
    <img src="./loading.gif" alt="loading" />
  </article>`
  try {
    const response = await fetch (source);
    const data = await response.json();
    console.log(data);
    return data;
    
  } catch (error) {
    cocktailDom.innerHTML = `
    <h2 class="title">There was an error...</h2>
    `
  }
}

function displayData(data) {
  // console.log(data.drinks);
  const drinks = data.drinks;
  if(!drinks){
    cocktailDom.innerHTML = `
    <h2 class="title">There is no result for this search...</h2>
    `;
    return;
  }
  
  const results = drinks.map((drink) => {
    //id, image, title
    const {idDrink: id, strDrink: title, strDrinkThumb: image } = drink;

    // console.log(id, image, title);
    return `
    <a href="drink.html?id=${id}">
      <article class="cocktail" data-id="${id}">
        <img src="${image}" alt="${title}">
        <h3>${title}</h3>
      </article>
    </a>`
  }).join('');

  cocktailDom.innerHTML = `<div class="section-center">
  ${results}
  </div>`

}

async function showData() {
  const data = await fetchData(`${url}?s=a`);
  displayData(data);
}

function searchForm(){
  form.addEventListener('input', async () => {
    const inputValue = formInput.value;
    if(!inputValue) return showData();
    const filterData = await fetchData(`${url}?s=${inputValue}`);
    displayData(filterData);
  })
  

}

searchForm()
showData()