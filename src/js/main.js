/* global instagramFeed followSocialMedia siteSearch */

import 'lazysizes'

// Impost App
import instagram from './app/app.instagram'
import socialMedia from './app/app.social-media'

((window, document) => {
  /* Variables
  /* ---------------------------------------------------------- */
  const $body = document.body
  const $header = document.querySelector('.header')
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

  /* Scroll - add border bottom in the header
  /* ---------------------------------------------------------- */

  let lastScrollY = window.scrollY
  let ticking = false

  const onScroll = () => {
    lastScrollY = window.scrollY
    requestTick()
  }

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(update)
    }

    ticking = true
  }

  const update = () => {
    if (lastScrollY >= 100) {
      $header.classList.add('has-shadow')
    } else {
      $header.classList.remove('has-shadow')
    }

    ticking = false
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  update()

  //
})(window, document)
