/* global instagramFeed followSocialMedia */

// import external dependencies
import 'lazysizes';

// Impost App
import instagram from './app/app.instagram';
import socialMedia from './app/app.social-media';

document.addEventListener('DOMContentLoaded', function() {

  // Social Media
  if (typeof followSocialMedia !== 'undefined') { socialMedia(followSocialMedia) }

  // Instagram Feed
  if (typeof instagramFeed === 'object' && instagramFeed !== null) {
    const url = `https://api.instagram.com/v1/users/${instagramFeed.userId}/media/recent/?access_token=${instagramFeed.token}&count=10&callback=?`;
    const user = `<a href="https://www.instagram.com/${instagramFeed.userName}" class="instagram-btn" target="_blank" rel="noopener noreferrer"><i class="i-instagram"></i> ${instagramFeed.userName}</a>`;

    if( window.innerWidth > 768 ){
      instagram(url, user);
    }
  }
});
