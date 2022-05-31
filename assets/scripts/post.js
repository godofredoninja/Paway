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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvcG9zdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsQ0FBQyxVQUFDLE1BQUQsRUFBUyxRQUFULEVBQXNCO0VBQ3JCO0FBQ0Y7RUFDRSxJQUFNLFdBQVcsR0FBRyxDQUNsQixpQ0FEa0IsRUFFbEIsZ0NBRmtCLEVBR2xCLDRCQUhrQixFQUlsQixxQ0FKa0IsRUFLbEIsbURBTGtCLENBQXBCO0VBUUE7QUFDRjs7RUFDRSxJQUFNLFVBQVUsR0FBRyxTQUFiLFVBQWEsQ0FBQyxHQUFELEVBQU0sUUFBTixFQUFtQjtJQUNwQyxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUF0QjtJQUNBLGFBQWEsQ0FBQyxHQUFkLEdBQW9CLEdBQXBCO0lBQ0EsUUFBUSxJQUFJLGFBQWEsQ0FBQyxnQkFBZCxDQUErQixNQUEvQixFQUF1QyxRQUF2QyxDQUFaO0lBQ0EsUUFBUSxDQUFDLElBQVQsQ0FBYyxXQUFkLENBQTBCLGFBQTFCO0VBQ0QsQ0FMRDs7RUFPQSxJQUFNLFNBQVMsR0FBRyxTQUFaLFNBQVksQ0FBQSxJQUFJLEVBQUk7SUFDeEIsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEI7SUFDQSxXQUFXLENBQUMsR0FBWixHQUFrQixZQUFsQjtJQUNBLFdBQVcsQ0FBQyxJQUFaLEdBQW1CLElBQW5CO0lBQ0EsUUFBUSxDQUFDLElBQVQsQ0FBYyxXQUFkLENBQTBCLFdBQTFCO0VBQ0QsQ0FMRDtFQU9BO0FBQ0Y7OztFQUNFLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixXQUFXLENBQUMsSUFBWixDQUFpQixHQUFqQixDQUExQixDQUFsQjs7RUFFQSxJQUFJLFNBQVMsQ0FBQyxNQUFkLEVBQXNCO0lBQ3BCLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFVBQUEsRUFBRSxFQUFJO01B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QUFNLENBQUMsV0FBNUIsR0FBMEMsUUFBUSxDQUFDLGVBQVQsQ0FBeUIsWUFBekIsR0FBd0MsUUFBUSxDQUFDLGVBQVQsQ0FBeUIsWUFBakUsR0FBZ0YsTUFBTSxDQUFDLE1BQVAsQ0FBYyxNQUFoSztNQUVBLElBQU0sSUFBSSxHQUFLLGNBQWMsR0FBRyxDQUFsQixHQUF3QixLQUFLLEdBQUcsQ0FBakMsR0FBdUMsY0FBcEQ7TUFDQSxJQUFNLEdBQUcsR0FBSyxlQUFlLEdBQUcsQ0FBbkIsR0FBeUIsTUFBTSxHQUFHLENBQW5DLEdBQXlDLGFBQXJEO01BQ0EsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQVAsQ0FBWSxDQUFDLENBQUMsYUFBRixDQUFnQixJQUE1QixFQUFrQyxjQUFsQyxrQ0FBMkUsS0FBM0Usc0JBQTRGLE1BQTVGLG1CQUEyRyxHQUEzRyxvQkFBd0gsSUFBeEgsRUFBbEIsQ0FaeUYsQ0FjekY7O01BQ0EsTUFBTSxDQUFDLEtBQVAsSUFBZ0IsU0FBUyxDQUFDLEtBQVYsRUFBaEI7TUFFQSxDQUFDLENBQUMsY0FBRjtJQUNELENBbEJzRCxDQUFKO0VBQUEsQ0FBbkQsRUFqRnFCLENBcUdyQjtBQUNELENBdEdELEVBc0dHLE1BdEdILEVBc0dXLFFBdEdYIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiKCh3aW5kb3csIGRvY3VtZW50KSA9PiB7XHJcbiAgLyogVmFyaWFibGVzXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGNvbnN0IGlmcmFtZVZpZGVvID0gW1xyXG4gICAgJ2lmcmFtZVtzcmMqPVwicGxheWVyLnZpbWVvLmNvbVwiXScsXHJcbiAgICAnaWZyYW1lW3NyYyo9XCJkYWlseW1vdGlvbi5jb21cIl0nLFxyXG4gICAgJ2lmcmFtZVtzcmMqPVwieW91dHViZS5jb21cIl0nLFxyXG4gICAgJ2lmcmFtZVtzcmMqPVwieW91dHViZS1ub2Nvb2tpZS5jb21cIl0nLFxyXG4gICAgJ2lmcmFtZVtzcmMqPVwia2lja3N0YXJ0ZXIuY29tXCJdW3NyYyo9XCJ2aWRlby5odG1sXCJdJ1xyXG4gIF1cclxuXHJcbiAgLyogTG9hZCBTY3JpcHQgYW5kIFN0eWxlc1xyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBjb25zdCBsb2FkU2NyaXB0ID0gKHNyYywgY2FsbGJhY2spID0+IHtcclxuICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxyXG4gICAgc2NyaXB0RWxlbWVudC5zcmMgPSBzcmNcclxuICAgIGNhbGxiYWNrICYmIHNjcmlwdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNhbGxiYWNrKVxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KVxyXG4gIH1cclxuXHJcbiAgY29uc3QgbG9hZFN0eWxlID0gaHJlZiA9PiB7XHJcbiAgICBjb25zdCBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxyXG4gICAgbGlua0VsZW1lbnQucmVsID0gJ3N0eWxlc2hlZXQnXHJcbiAgICBsaW5rRWxlbWVudC5ocmVmID0gaHJlZlxyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rRWxlbWVudClcclxuICB9XHJcblxyXG4gIC8qIFZpZGVvIHJlc3BvbnNpdmVcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgY29uc3QgYXJySWZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpZnJhbWVWaWRlby5qb2luKCcsJykpXHJcblxyXG4gIGlmIChhcnJJZnJhbWUubGVuZ3RoKSB7XHJcbiAgICBhcnJJZnJhbWUuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgIGJveC5jbGFzc05hbWUgPSAndmlkZW8tcmVzcG9uc2l2ZSdcclxuICAgICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYm94LCBlbClcclxuICAgICAgYm94LmFwcGVuZENoaWxkKGVsKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8qIEdhbGxlcnlcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmtnLWdhbGxlcnktaW1hZ2UgaW1nJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGl0ZW0uY2xvc2VzdCgnLmtnLWdhbGxlcnktaW1hZ2UnKVxyXG4gICAgY29uc3Qgd2lkdGggPSBpdGVtLmF0dHJpYnV0ZXMud2lkdGgudmFsdWVcclxuICAgIGNvbnN0IGhlaWdodCA9IGl0ZW0uYXR0cmlidXRlcy5oZWlnaHQudmFsdWVcclxuICAgIGNvbnN0IHJhdGlvID0gd2lkdGggLyBoZWlnaHRcclxuICAgIGNvbnRhaW5lci5zdHlsZS5mbGV4ID0gcmF0aW8gKyAnIDEgMCUnXHJcbiAgfSlcclxuXHJcbiAgLyogPGltZz4gU2V0IEF0cmlidXRlIChkYXRhLXNyYyAtIGRhdGEtc3ViLWh0bWwpXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3N0LWJvZHkgaW1nJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICBpZiAoZWwuY2xvc2VzdCgnYScpKSByZXR1cm5cclxuXHJcbiAgICBlbC5jbGFzc0xpc3QuYWRkKCdwYXdheS1saWdodC1nYWxsZXJ5JylcclxuICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCBlbC5zcmMpXHJcblxyXG4gICAgY29uc3QgbmV4dEVsZW1lbnQgPSBlbC5uZXh0U2libGluZ1xyXG5cclxuICAgIGlmIChuZXh0RWxlbWVudCAhPT0gbnVsbCAmJiBuZXh0RWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZmlnY2FwdGlvbicpIHtcclxuICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXN1Yi1odG1sJywgbmV4dEVsZW1lbnQuaW5uZXJIVE1MKVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIC8qIExpZ2h0Z2FsbGVyeVxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBjb25zdCBsaWdodEdhbGxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGF3YXktbGlnaHQtZ2FsbGVyeScpXHJcblxyXG4gIGlmIChsaWdodEdhbGxlcnkubGVuZ3RoKSB7XHJcbiAgICBsb2FkU3R5bGUoJ2h0dHBzOi8vdW5wa2cuY29tL2xpZ2h0Z2FsbGVyeS5qcy9kaXN0L2Nzcy9saWdodGdhbGxlcnkubWluLmNzcycpXHJcblxyXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9saWdodGdhbGxlcnkuanNAMS4xLjMvZGlzdC9qcy9saWdodGdhbGxlcnkubWluLmpzJywgKCkgPT4ge1xyXG4gICAgICBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9sZy16b29tLmpzQDEuMC4xL2Rpc3QvbGctem9vbS5taW4uanMnKVxyXG5cclxuICAgICAgd2luZG93LmxpZ2h0R2FsbGVyeShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC1ib2R5JyksIHsgc2VsZWN0b3I6ICcucGF3YXktbGlnaHQtZ2FsbGVyeScgfSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvKiBQb3N0IFNoYXJlXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zaGFyZScpLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICBjb25zdCB3aWR0aCA9IDY0MFxyXG4gICAgY29uc3QgaGVpZ2h0ID0gNDAwXHJcblxyXG4gICAgY29uc3QgZHVhbFNjcmVlbkxlZnQgPSB3aW5kb3cuc2NyZWVuTGVmdCAhPT0gdW5kZWZpbmVkID8gd2luZG93LnNjcmVlbkxlZnQgOiB3aW5kb3cuc2NyZWVuWFxyXG4gICAgY29uc3QgZHVhbFNjcmVlblRvcCA9IHdpbmRvdy5zY3JlZW5Ub3AgIT09IHVuZGVmaW5lZCA/IHdpbmRvdy5zY3JlZW5Ub3AgOiB3aW5kb3cuc2NyZWVuWVxyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGggPyB3aW5kb3cuaW5uZXJXaWR0aCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA6IHdpbmRvdy5zY3JlZW4ud2lkdGhcclxuICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCA/IHdpbmRvdy5pbm5lckhlaWdodCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IDogd2luZG93LnNjcmVlbi5oZWlnaHRcclxuXHJcbiAgICBjb25zdCBsZWZ0ID0gKChjb250YWluZXJXaWR0aCAvIDIpIC0gKHdpZHRoIC8gMikpICsgZHVhbFNjcmVlbkxlZnRcclxuICAgIGNvbnN0IHRvcCA9ICgoY29udGFpbmVySGVpZ2h0IC8gMikgLSAoaGVpZ2h0IC8gMikpICsgZHVhbFNjcmVlblRvcFxyXG4gICAgY29uc3QgbmV3V2luZG93ID0gd2luZG93Lm9wZW4oZS5jdXJyZW50VGFyZ2V0LmhyZWYsICdzaGFyZS13aW5kb3cnLCBgc2Nyb2xsYmFycz15ZXMsIHdpZHRoPSR7d2lkdGh9LCBoZWlnaHQ9JHtoZWlnaHR9LCB0b3A9JHt0b3B9LCBsZWZ0PSR7bGVmdH1gKVxyXG5cclxuICAgIC8vIFB1dHMgZm9jdXMgb24gdGhlIG5ld1dpbmRvd1xyXG4gICAgd2luZG93LmZvY3VzICYmIG5ld1dpbmRvdy5mb2N1cygpXHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgfSkpXHJcblxyXG4gIC8vXHJcbn0pKHdpbmRvdywgZG9jdW1lbnQpXHJcbiJdfQ==

//# sourceMappingURL=map/post.js.map
