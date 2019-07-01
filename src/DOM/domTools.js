
// Browsers DOM helper tools.
// Version: 1.0.0.0

const domReady = function (fn) {

  if (typeof fn !== 'function') return;

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    return fn();
  }

  document.addEventListener('DOMContentLoaded', fn, false);

};

const getElement = function (selector, parent) {
  return (parent || document).querySelector(selector);
};

const getElements = function (selector, parent) {
  return [].slice.call((parent || document).querySelectorAll(selector));
};

const getParents = function (elem, selector) {

  let parents = [];

  while (elem && elem !== document) {

    if (selector) {
      if (elem.matches(selector)) {
        parents.push(elem);
      }
    } else {
      parents.push(elem);
    }

    elem = elem.parentNode;

  }

  return parents;

};

const getSiblings = function (elem) {
  return [].filter.call(elem.parentNode.children, (sibling) => sibling !== elem);
};

const getSibling = function (elem, selector, searchDirection) {

  let sibling = elem[searchDirection];

  if (!selector) return sibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling[searchDirection]
  }

};

const getSiblingNext = (elem, selector) => getSibling(elem, selector, 'nextElementSibling' )
const getSiblingPrevious = (elem, selector) => getSibling(elem, selector, 'previousElementSibling' )

const isOutOfViewport = function (elem) {

  const bounding = elem.getBoundingClientRect();

  const out = {};
  out.top = bounding.top < 0;
  out.left = bounding.left < 0;
  out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
  out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;
  out.all = out.top && out.left && out.bottom && out.right;

  return out;

};

const decodeHTML = function (html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const scrollDistance = function (callback, refresh) {

  if (!callback || typeof callback !== 'function') return;

  let isScrolling, start, end, distance;

  window.addEventListener('scroll', function (event) {

    if (!start) {
      start = window.pageYOffset;
    }

    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(function() {

      end = window.pageYOffset;
      distance = end - start;

      callback(distance, start, end);

      start = null;
      end = null;
      distance = null;

    }, refresh || 66);

  }, false);

};

const onScrollStop = function (callback) {

  if (!callback || typeof callback !== 'function') return;

  let isScrolling;

  window.addEventListener('scroll', function (event) {

    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(function() {

      callback();

    }, 66);

  }, false);

};


getElements('.epi-form-container__section__row').filter((item) => item.innerText == "Insurance disclaimer text" )