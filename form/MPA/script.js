// script.js

/**
 * Creates an HTML string for the product that is given
 * @param {Object} prodInfo Object with product info straight from fetched array
 * @returns {String} A string with HTML content so it can be concatenated with
 *                   other similar objects for one singular .innerHTML call later
 */
export function createElement(prodInfo) {
  let product = `
    <div class="product" data-id="${prodInfo.id - 1}">
      <div class="product__div-imgWrapper">
        <img src="${prodInfo.image}" alt="${prodInfo.title}" class="product__img" width="250" />
      </div>
      <p class="product__p-title">${prodInfo.title}</p>
      <div class="product__div-priceBtnWrapper">
        <p class="product__p-price">$${prodInfo.price.toFixed(2)}</p>
        <button class="product__btn-addToCart">Add to Cart</button>
      </div>
    </div>
  `;
  return product;
}


/**
 * Fetches products from JSON file then creates elements from them and inserts them into page
 */
async function insertProducts() {
  let products, prodSection, prodSectionContent, prodNodes;
  prodSectionContent = '';
  prodSection = document.querySelector('#products');
  products = JSON.parse(localStorage.getItem('products'));
  if (!products) {
    products = await fetch('products.json');
    products = await products.json();
    localStorage.setItem('products', JSON.stringify(products));
  }
  products.forEach(prod => { prodSectionContent += createElement(prod) });
  prodSection.innerHTML = prodSectionContent;
}

function addProductToCart(prodID) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(JSON.parse(localStorage.getItem('products'))[prodID]);
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addItemsToCart() {
  let cart = localStorage.getItem('cart');
  if (!cart) {
    let products = JSON.parse(localStorage.getItem('products'));
    cart = [];
    cart.push(products[2]);
    cart.push(products[4]);
    cart.push(products[6]);
    cart.push(products[9]);
    cart.push(products[12]);
    cart.push(products[13]);
    cart.push(products[15]);
    cart.push(products[17]);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

/**
 * Initializes the page once the DOM has fully loaded
 */
async function init() {
  await insertProducts();
  addItemsToCart();
}

window.addEventListener('DOMContentLoaded', init);
