/*
Hide header on scroll down & show on scroll up
*/

const header = document.getElementById('header');
let lastPos = document.documentElement.scrollTop;

window.addEventListener('scroll', () => {
  const currPos = document.documentElement.scrollTop;

  if (currPos > lastPos) {
    if (currPos > header.offsetHeight) {
      header.classList.add('-translate-y-full');
      header.classList.remove('header-shadow');
    }
  } else {
    header.classList.remove('-translate-y-full');
    header.classList.add('header-shadow');
  }

  lastPos = currPos;
}, false);

/*
Toggle the menu when pressed on hamburger button
Only on mobile devices
*/

var menu_status = false;

const menu_horiz = document.getElementById('menu-horiz');
const menu_vert = document.getElementById('menu-vert');
const menuToggle = document.getElementById('menu-toggle');
const menu_hamburger = document.getElementById('menu-hamburger');
const menu_x = document.getElementById('menu-x');

menuToggle.addEventListener('click', () => {
  if (menu_status) {
    menu_status = false;
    menu_horiz.classList.remove('hidden');
    menu_vert.classList.add('hidden');
    menu_hamburger.classList.remove('hidden')
    menu_x.classList.add('hidden')
  } else {
    menu_status = true;
    menu_horiz.classList.add('hidden');
    menu_vert.classList.remove('hidden');
    menu_hamburger.classList.add('hidden')
    menu_x.classList.remove('hidden')
  }
}, false);

/*
Lazy load images
*/

const lazyImages = document.getElementsByClassName('lazy');

document.addEventListener('DOMContentLoaded', () => {
  [...lazyImages].forEach((elem) => {
    const originalImage = elem.dataset.src;

    elem.setAttribute('src', originalImage);
    elem.removeAttribute('data-src');
  });
}, false);
