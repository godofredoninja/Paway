(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

(function (window, document) {
  /* Variables
  /* ---------------------------------------------------------- */
  var iframeVideo = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="dailymotion.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]'];
  /* Load Script and Styles
  /* ---------------------------------------------------------- */

  var loadScript = function loadScript(src, callback) {
    var scriptElement = document.createElement('script');
    scriptElement.src = src;
    callback && scriptElement.addEventListener('load', callback);
    document.body.appendChild(scriptElement);
  };

  var loadStyle = function loadStyle(href) {
    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = href;
    document.head.appendChild(linkElement);
  };
  /* Video responsive
  /* ---------------------------------------------------------- */


  var arrIframe = document.querySelectorAll(iframeVideo.join(','));

  if (arrIframe.length) {
    arrIframe.forEach(function (el) {
      var box = document.createElement('div');
      box.className = 'video-responsive';
      el.parentNode.insertBefore(box, el);
      box.appendChild(el);
    });
  }
  /* Gallery
  /* ---------------------------------------------------------- */


  document.querySelectorAll('.kg-gallery-image img').forEach(function (item) {
    var container = item.closest('.kg-gallery-image');
    var width = item.attributes.width.value;
    var height = item.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });
  /* <img> Set Atribute (data-src - data-sub-html)
  /* ---------------------------------------------------------- */

  document.querySelectorAll('.post-body img').forEach(function (el) {
    if (el.closest('a')) return;
    el.classList.add('paway-light-gallery');
    el.setAttribute('data-src', el.src);
    var nextElement = el.nextSibling;

    if (nextElement !== null && nextElement.nodeName.toLowerCase() === 'figcaption') {
      el.setAttribute('data-sub-html', nextElement.innerHTML);
    }
  });
  /* Lightgallery
  /* ---------------------------------------------------------- */

  var lightGallery = document.querySelectorAll('.paway-light-gallery');

  if (lightGallery.length) {
    loadStyle('https://unpkg.com/lightgallery.js/dist/css/lightgallery.min.css');
    loadScript('https://cdn.jsdelivr.net/npm/lightgallery.js@1.1.3/dist/js/lightgallery.min.js', function () {
      loadScript('https://unpkg.com/lg-zoom.js@1.0.1/dist/lg-zoom.min.js');
      window.lightGallery(document.querySelector('.post-body'), {
        selector: '.paway-light-gallery'
      });
    });
  }
  /* Post Share
  /* ---------------------------------------------------------- */


  document.querySelectorAll('.js-share').forEach(function (item) {
    return item.addEventListener('click', function (e) {
      var width = 640;
      var height = 400;
      var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
      var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
      var containerWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
      var containerHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
      var left = containerWidth / 2 - width / 2 + dualScreenLeft;
      var top = containerHeight / 2 - height / 2 + dualScreenTop;
      var newWindow = window.open(e.currentTarget.href, 'share-window', "scrollbars=yes, width=".concat(width, ", height=").concat(height, ", top=").concat(top, ", left=").concat(left)); // Puts focus on the newWindow

      window.focus && newWindow.focus();
      e.preventDefault();
    });
  }); //
})(window, document);

},{}]},{},[1])

//# sourceMappingURL=map/post.js.map
