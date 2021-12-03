// cart.js

/**
 * Creates an HTML string for the product that is given
 * @param {Object} prodInfo Object with product info straight from fetched array
 * @returns {String} A string with HTML content so it can be concatenated with
 *                   other similar objects for one singular .innerHTML call later
 */
export function createElement(prodInfo) {
  let product = `
    <div class="product">
      <div class="product__div-imgWrapper">
        <img src="${prodInfo.image}" alt="${prodInfo.title}" class="product__img" width="250" />
      </div>
      <p class="product__p-title">${prodInfo.title}</p>
      <div class="product__div-priceBtnWrapper">
        <p class="product__p-price">$${prodInfo.price}</p>
        <button class="product__btn-removeToCart">Remove from Cart</button>
      </div>
    </div>
  `;
  return product;
}

function populatePage() {
  let products, prodSection, prodSectionContent, total;
  prodSectionContent = '';
  prodSection = document.querySelector('#products');
  products = JSON.parse(localStorage.getItem('cart'));
  if (!products) {
    return;
  }
  total = 0;
  products.forEach(prod => {
    prodSectionContent += createElement(prod);
    total += prod.price;
  });
  prodSection.innerHTML = prodSectionContent;
  document.querySelector('#total').innerText = `$${total.toLocaleString()}`;
}

function init() {
  populatePage();
}

window.addEventListener('DOMContentLoaded', init);
