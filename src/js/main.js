import 'lazysizes'

((window, document) => {
  /* Load Script and Styles
  /* ---------------------------------------------------------- */
  const loadScript = (src, callback) => {
    const scriptElement = document.createElement('script')
    scriptElement.src = src
    callback && scriptElement.addEventListener('load', callback)
    document.body.appendChild(scriptElement)
  }

  const loadStyle = href => {
    const linkElement = document.createElement('link')
    linkElement.rel = 'stylesheet'
    linkElement.href = href
    document.head.appendChild(linkElement)
  }

  /* Toggle Menu
  /* ---------------------------------------------------------- */
  document.querySelectorAll('.js-menu-toggle').forEach(item => item.addEventListener('click', function (e) {
    e.preventDefault()

    document.body.classList.toggle('has-sidenav')
  }))

  /* return if you are not on the post page
  /* ---------------------------------------------------------- */

  if(!document.querySelector('.post-body')) return

  /* All Video Responsive
  /* ---------------------------------------------------------- */
  const videoResponsive = () => {
    const iframeSelectors = [
      'iframe[src*="player.vimeo.com"]',
      'iframe[src*="dailymotion.com"]',
      'iframe[src*="youtube.com"]',
      'iframe[src*="youtube-nocookie.com"]',
      'iframe[src*="kickstarter.com"][src*="video.html"]'
    ]

    const $iframes = document.querySelectorAll(iframeSelectors.join(','))

    if (!$iframes.length) return

    $iframes.forEach(el => {
      const box = document.createElement('div')
      box.className = 'video-responsive'
      el.parentNode.insertBefore(box, el)
      box.appendChild(el)
    })
  }

  videoResponsive()

  /* Paway Gallery
  /* ---------------------------------------------------------- */
  const pawayGallery = () => {
    // <img> Set Atribute (data-src - data-sub-html)
    document.querySelectorAll('.post-body img').forEach(el => {
      if (el.closest('a')) return

      el.classList.add('paway-light-gallery')
      el.setAttribute('data-src', el.src)

      const nextElement = el.nextSibling

      if (nextElement !== null && nextElement.nodeName.toLowerCase() === 'figcaption') {
        el.setAttribute('data-sub-html', nextElement.innerHTML)
      }
    })

    // Lightgallery
    const lightGallery = document.querySelectorAll('.paway-light-gallery')

    if (!lightGallery.length) return

    loadStyle('https://unpkg.com/lightgallery.js/dist/css/lightgallery.min.css')

    loadScript('https://cdn.jsdelivr.net/npm/lightgallery.js@1.1.3/dist/js/lightgallery.min.js', () => {
      loadScript('https://unpkg.com/lg-zoom.js@1.0.1/dist/lg-zoom.min.js')

      window.lightGallery(document.querySelector('.post-body'), { selector: '.paway-light-gallery' })
    })
  }

  pawayGallery()

  /* Post Share
  /* ---------------------------------------------------------- */
  const pawayShare = () => {
    document.querySelectorAll('.js-share').forEach(item => item.addEventListener('click', e => {
      const width = 640
      const height = 400

      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

      const containerWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width
      const containerHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height

      const left = ((containerWidth / 2) - (width / 2)) + dualScreenLeft
      const top = ((containerHeight / 2) - (height / 2)) + dualScreenTop
      const newWindow = window.open(e.currentTarget.href, 'share-window', `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`)

      // Puts focus on the newWindow
      window.focus && newWindow.focus()

      e.preventDefault()
    }))
  }

  pawayShare()
})(window, document)
