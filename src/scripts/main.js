/* global instagramFeed followSocialMedia */

// import external dependencies
import 'lazysizes';

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
    const $allIframe = document.querySelectorAll(iframeVideo.join(','));

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

  // Instagram Feed
  if (typeof instagramFeed === 'object' && instagramFeed !== null) {
    const url = `https://api.instagram.com/v1/users/${instagramFeed.userId}/media/recent/?access_token=${instagramFeed.token}&count=10&callback=?`;
    const user = `<a href="https://www.instagram.com/${instagramFeed.userName}" class="instagram-btn" target="_blank" rel="noopener noreferrer"><i class="i-instagram"></i> ${instagramFeed.userName}</a>`;

    if( window.innerWidth > 768 ){
      instagram(url, user);
    }
  }
});
