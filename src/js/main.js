/* global followSocialMedia siteSearch */

import 'lazysizes'

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

  /*  Toggle modal
  /* ---------------------------------------------------------- */
  // const modal = () => {
  //   const $modals = document.querySelectorAll('.js-modal')
  //   const $modalButtons = document.querySelectorAll('.js-modal-button')
  //   const $modalCloses = document.querySelectorAll('.js-modal-close')

  //   // Modal Click Open
  //   if (!$modalButtons.length) return
  //   $modalButtons.forEach($el => $el.addEventListener('click', () => openModal($el.dataset.target)))

  //   // Modal Click Close
  //   if (!$modalCloses.length) return
  //   $modalCloses.forEach(el => el.addEventListener('click', () => closeModals()))

  //   const openModal = target => {
  //     document.body.classList.remove('has-menu')
  //     const $target = document.getElementById(target)
  //     document.documentElement.classList.add('overflow-hidden')
  //     $target.classList.add('is-active')

  //     if (target === 'modal-search') {
  //       document.querySelector('#search-field').focus()
  //     }
  //   }

  //   const closeModals = () => {
  //     document.documentElement.classList.remove('overflow-hidden')
  //     $modals.forEach($el => $el.classList.remove('is-active'))
  //   }

  //   document.addEventListener('keydown', function (event) {
  //     const e = event || window.event
  //     if (e.keyCode === 27) {
  //       closeModals()
  //       // closeDropdowns()
  //     }
  //   })
  // }

  // modal()

  /* Load Script
  /* ---------------------------------------------------------- */
  const loadScript = (src, callback) => {
    const scriptElement = document.createElement('script')
    scriptElement.src = src
    scriptElement.defer = true
    scriptElement.async = true

    callback && scriptElement.addEventListener('load', callback)
    document.body.appendChild(scriptElement)
  }

  /* Load Search
  /* ---------------------------------------------------------- */
  // if (typeof searchSettings !== 'undefined' && typeof siteSearch !== 'undefined') {
  //   loadScript(siteSearch)
  // }

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
