// script.js

// Adds user input as cookie
function addCookie() {
  let key = document.getElementById('keyname').value;
  let value = document.getElementById('keyvalue').value;
  let date = new Date();
  date.setTime(date.getTime() + (60 * 60 * 1000));
  let expires = `expires=${date.toGMTString()}`;
  document.cookie = `${key}=${value}; ${expires}; path=/`;
  document.getElementById('message').innerHTML = `${key}: ${value} added to cookie.`;
}

// Gets the value for the specified key
function getCookie() {
  let key, value, nameEQ, cookiesArr;
  key = document.getElementById('keyname').value;
  nameEQ = `${key}=`;
  cookiesArr = document.cookie.split('; ');
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i].startsWith(key) && cookiesArr[i].charAt(key.length) == '=') {
      value = cookiesArr[i].substr(key.length + 1, cookiesArr[i].length - key.length - 1);
      break;
    }
  }
  document.getElementById('message').innerHTML = `${key}: ${value} (from cookie)`;
}

// Gets all of the Key / Value pairs from document.cookie
function getCookieList() {
  let cookieArray = document.cookie.split(';');
  document.getElementById('message').innerHTML = '<strong>Cookies</strong><br />';
  for (let i = 0, len = cookieArray.length; i < len; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    let cookiePieces = cookie.split('=');
    let key = cookiePieces[0];
    let value = cookiePieces[1];
    document.getElementById('message').innerHTML += `${key}: ${value} <br />`;
  }
}

// Removes the specified key / value pair
function removeCookie() {
  let key = document.getElementById('keyname').value;
  let date = new Date();
  date.setTime(date.getTime() - (24 * 60 * 60 * 1000));
  let expires = `expires=${date.toGMTString()}`;
  document.cookie = `${key}=; ${expires}; path=/`;
  document.getElementById('message').innerHTML = `${key} removed from cookie.`;
}

// Clears all of the key / value pairs
function removeAllCookies() {
  let cookies = document.cookie.split(';');
  let date = new Date();
  date.setTime(date.getTime() - (24 * 60 * 60 * 1000));
  let expires = `expires=${date.toGMTString()}`;
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let key = cookie.split('=')[0];
    document.cookie = `${key}=; ${expires}; path=/`;
  }
  document.getElementById('message').innerHTML = 'All cookies cleared.'
}

function getAllCookies() {
  let msg = '';
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    msg += `${cookie}<br />`;
  }
  document.getElementById('message').innerHTML = msg;
}

function bindEvents() {
  document.getElementById('btnAdd').addEventListener('click', addCookie);
  document.getElementById('btnGet').addEventListener('click', getCookie);
  document.getElementById('btnRemove').addEventListener('click', removeCookie);
  document.getElementById('btnGetAll').addEventListener('click', getCookieList);
  document.getElementById('btnRemoveAll').addEventListener('click', removeAllCookies);
}

function init() {
  bindEvents();
}

window.addEventListener('DOMContentLoaded', () => {
  init();
});
