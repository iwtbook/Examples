// script.js

import { Router } from './router-client.js';

/**
 * Creates an HTML string for the product that is given
 * @param {Object} prodInfo Object with product info straight from fetched array
 * @returns {String} A string with HTML content so it can be concatenated with
 *                   other similar objects for one singular .innerHTML call later
 */
function createElement(prodInfo) {
  let product = `
    <div class="product">
      <div class="product__div-imgWrapper">
        <img src="http://127.0.0.1:5500/Form/SPA/${prodInfo.image}" alt="${prodInfo.title}" class="product__img" width="250" />
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

async function populatePage(page) {
  let products, prodSection, prodSectionContent, total;
  prodSectionContent = '';
  prodSection = document.querySelector('#products');

  products = JSON.parse(localStorage.getItem(page));
  if (!products) {
    if (page == 'products') {
      products = await fetch('products.json');
      products = await products.json();
      localStorage.setItem('products', JSON.stringify(products));
    } else {
      return;
    }
  }

  total = 0;
  products.forEach(prod => {
    prodSectionContent += createElement(prod);
    total += prod.price;
  });
  prodSection.innerHTML = prodSectionContent;
  if (page == 'cart') document.querySelector('#total').innerText = `$${total.toLocaleString()}`;
}

function home() {
  document.body.setAttribute('class', 'home');
  document.querySelector('#products').innerHTML = '';
  document.querySelector('header > h1').innerHTML = 'Store Demo';
  populatePage('products');
}

function cart() {
  document.body.setAttribute('class', 'cart');
  document.querySelector('#products').innerHTML = '';
  document.querySelector('header > h1').innerHTML = 'Shopping Cart';
  populatePage('cart');
}

function user() {
  document.body.setAttribute('class', 'user');
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
function init() {
  populatePage('products');
  const router = new Router('/Form/SPA', home);
  router.addRoute('/Form/SPA/cart', cart);
  router.addRoute('/Form/SPA/user', user);
  addItemsToCart();
}

window.addEventListener('DOMContentLoaded', init);
