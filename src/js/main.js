/* global instagramFeed followSocialMedia siteUrl */

// import external dependencies
import 'lazysizes'
// Image Zoom
// import Lightense from 'lightense-images'

// Impost App
import instagram from './app/app.instagram'
import socialMedia from './app/app.social-media'

(function (window, document) {
  /* Variables */
  const $body = document.body
  // const $header = document.getElementById('header')

  // Toggle Menu
  document.querySelectorAll('.js-menu-toggle').forEach(item => item.addEventListener('click', function (e) {
    e.preventDefault()

    $body.classList.toggle('has-sidenav')
  }))

  /**
   * Social Media
   */
  if (typeof followSocialMedia === 'object' && followSocialMedia !== null) {
    socialMedia(followSocialMedia)
  }

  /**
   * Instagram Fedd
   */
  if (typeof instagramFeed === 'object' && instagramFeed !== null) {
    const url = `https://api.instagram.com/v1/users/${instagramFeed.userId}/media/recent/?access_token=${instagramFeed.token}&count=10&callback=?`
    const user = `<a href="https://www.instagram.com/${instagramFeed.userName}" class="instagram-btn" target="_blank" rel="noopener noreferrer"><i class="i-instagram"></i> ${instagramFeed.userName}</a>`

    if (window.innerWidth > 768) {
      instagram(url, user)
    }
  }
//
})(window, document)
