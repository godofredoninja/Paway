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
  const $header = document.getElementById('header')

  /* Variables Boolean */
  let didScroll = false

  /* Variables Object or Arrays */

  /* Iframe SRC video */
  const iframeVideo = [
    'iframe[src*="player.vimeo.com"]',
    'iframe[src*="dailymotion.com"]',
    'iframe[src*="youtube.com"]',
    'iframe[src*="youtube-nocookie.com"]',
    'iframe[src*="vid.me"]',
    'iframe[src*="kickstarter.com"][src*="video.html"]',
  ]

  // Setting Image Zoom
  // const lightenseArgs = {
  //   // time: 300,
  //   padding: 60,
  //   offset: 30,
  //   // keyboard: true,
  //   cubicBezier: 'cubic-bezier(.2, 0, .1, 1)',
  //   background: 'rgb(255, 255, 255)',
  //   zIndex: 999,
  // }

  // Toggle Menu
  // const toggleMenu = () => $body.classList.toggle('has-sidenav')
  // document.getElementById('menu-toggle').addEventListener('click', toggleMenu)
  // document.getElementById('sidenav-close').addEventListener('click', toggleMenu)

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

    if( window.innerWidth > 768 ) {
      instagram(url, user)
    }
  }

  // If is article
  if ($body.classList.contains('is-article')) {
    // Select all Iframe
    const $imagesGallery = document.querySelectorAll('.kg-gallery-image img')
    const $allIframe = document.getElementById('post-body').querySelectorAll(iframeVideo.join(','))
    const $imageHasParentLink = document.querySelectorAll('.post-body a img')

    // Add not class for not zoom image
    $imageHasParentLink.forEach( el => el.classList.add('no-lightense'))
    // Zoom Image
    new Lightense('#post-body img:not(.no-lightense)', lightenseArgs)

    // Video Responsive
    if($allIframe.length) {
      // Run Iframe
      $allIframe.forEach( el => {
        const parentForVideo = document.createElement('div')
        parentForVideo.className = 'video-responsive'
        el.parentNode.insertBefore(parentForVideo, el)
        parentForVideo.appendChild(el)
      })
    }

    // Gallery Image
    $imagesGallery.forEach(function (image) {
      const container = image.closest('.kg-gallery-image')
      const width = image.attributes.width.value
      const height = image.attributes.height.value
      const ratio = width / height
      container.style.flex = ratio + ' 1 0%'
    })

    // PrismJS code syntax
    const $prismPre = document.getElementById('post-body').querySelectorAll('code[class*="language-"]')
    if ($prismPre.length) {

      let prismScript = document.createElement('script')
      prismScript.src = `${siteUrl}/assets/scripts/prism.js`
      prismScript.defer = true

      $body.appendChild(prismScript)
    }
  }

  // Active Scroll
  window.addEventListener('scroll', () => didScroll = true)

  /**
   * Add Shadow and Hide Shdow in .header
   */
   function hasScrolled () {
    if ($body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      $header.classList.add('has-shadow')
    } else {
      $header.classList.remove('has-shadow')
    }
   }

  /**
   * Functions that are activated when a scroll
   * is performed in a time interval
   */
  setInterval(() => {
    if (didScroll) {
      if ($header !== null) {
        hasScrolled()
      }

      didScroll = false
    }
  }, 250)

})(window, document)
