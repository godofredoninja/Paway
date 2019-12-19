/* global instagramFeed followSocialMedia siteSearch */

import 'lazysizes'

// Impost App
import instagram from './app/app.instagram'
import socialMedia from './app/app.social-media'

((window, document) => {
  /* Variables
  /* ---------------------------------------------------------- */
  const $body = document.body
  // const $header = document.getElementById('header')

  /* Toggle Menu
  /* ---------------------------------------------------------- */
  document.querySelectorAll('.js-menu-toggle').forEach(item => item.addEventListener('click', function (e) {
    e.preventDefault()

    $body.classList.toggle('has-sidenav')
  }))

  /* Social Media
  /* ---------------------------------------------------------- */
  if (typeof followSocialMedia === 'object' && followSocialMedia !== null) {
    socialMedia(followSocialMedia)
  }

  /* Instagram Feed
  /* ---------------------------------------------------------- */
  const instagramBox = document.querySelector('.js-instagram')
  if (typeof instagramFeed === 'object' && instagramFeed !== null && instagramBox) {
    instagram(instagramFeed, instagramBox)
  }

  /* Search
  /* ---------------------------------------------------------- */
  const loadScript = (src, callback) => {
    const scriptElement = document.createElement('script')
    scriptElement.src = src
    scriptElement.defer = true
    scriptElement.async = true

    callback && scriptElement.addEventListener('load', callback)
    document.body.appendChild(scriptElement)
  }

  if (typeof searchSettings !== 'undefined' && typeof siteSearch !== 'undefined') {
    loadScript('https://unpkg.com/@tryghost/content-api@1.3.4/umd/content-api.min.js', () => {
      loadScript(siteSearch)
    })
  }

  //
})(window, document)
