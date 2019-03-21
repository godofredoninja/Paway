/* global instagramFeed followSocialMedia */

// import external dependencies
import 'lazysizes';
// Image Zoom
import Lightense from 'lightense-images';

// Impost App
import instagram from './app/app.instagram';
import socialMedia from './app/app.social-media';

document.addEventListener('DOMContentLoaded', function() {

  // Social Media
  if (typeof followSocialMedia === 'object' && followSocialMedia !== null) socialMedia(followSocialMedia);

  // Video Responsive
  // const hasClass = (el, cls) => el.className && new RegExp(`(\\s|^)${cls}(\\s|$)`).test(el.className);
  // const $body = document.querySelector('body');

  if (document.body.classList.contains('is-article')) {
    /* Iframe SRC video */
    const iframeVideo = [
      'iframe[src*="player.vimeo.com"]',
      'iframe[src*="dailymotion.com"]',
      'iframe[src*="youtube.com"]',
      'iframe[src*="youtube-nocookie.com"]',
      'iframe[src*="vid.me"]',
      'iframe[src*="kickstarter.com"][src*="video.html"]',
    ];

    // Select all Iframe
    const $allIframe = document.getElementById('post-body').querySelectorAll(iframeVideo.join(','));

    if($allIframe.length) {
      // Run Iframe
      $allIframe.forEach( el => {
        const parentForVideo = document.createElement('div');
        parentForVideo.className = 'video-responsive';
        el.parentNode.insertBefore(parentForVideo, el);
        parentForVideo.appendChild(el);
      });
    }
  }

  /**
   * Zoom Images
   */
  const $linkImage = document.querySelectorAll('.post-body a img');
  // Add not class for not zoom image
  $linkImage.forEach( el => el.classList.add('no-lightense'));

  const lightenseArgs = {
    // time: 300,
    padding: 60,
    offset: 30,
    // keyboard: true,
    cubicBezier: 'cubic-bezier(.2, 0, .1, 1)',
    background: 'rgb(255, 255, 255)',
    zIndex: 999,
  }

  // Zoom Image
  new Lightense('.post-body img:not(.no-lightense)', lightenseArgs);

  // Gallery Image
  const images = document.querySelectorAll('.kg-gallery-image img');
  images.forEach(function (image) {
    const container = image.closest('.kg-gallery-image');
    const width = image.attributes.width.value;
    const height = image.attributes.height.value;
    const ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });

  // Instagram Feed
  if (typeof instagramFeed === 'object' && instagramFeed !== null) {
    const url = `https://api.instagram.com/v1/users/${instagramFeed.userId}/media/recent/?access_token=${instagramFeed.token}&count=10&callback=?`;
    const user = `<a href="https://www.instagram.com/${instagramFeed.userName}" class="instagram-btn" target="_blank" rel="noopener noreferrer"><i class="i-instagram"></i> ${instagramFeed.userName}</a>`;

    if( window.innerWidth > 768 ){
      instagram(url, user);
    }
  }

  // Scroll
  let didScroll = false;

  window.addEventListener('scroll', () => didScroll = true);

  const $header = document.getElementById('header');

  setInterval(() => {
    if (didScroll) {
      if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        $header.classList.add('has-shadow');
      } else {
        $header.classList.remove('has-shadow');
      }

      didScroll = false;
    }
  }, 250);


  // window.addEventListener('scroll', bringmenu);

  // function bringmenu() {
  //     if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
  //       console.log('test');
  //     } else {
  //       console.log('---hola');
  //     }
  // }
});
