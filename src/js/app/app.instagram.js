import fetchQuote from './app.fetch'

const templateInstagram = data => {
  return `<div class="py-instagram-items">
  <a href="${data.link}" class="py-instagram-img" target="_blank" rel="noopener noreferrer">
    <img class="u-absolute0 u-image u-block lazyload" data-src="${data.images.standard_resolution.url}" alt=""/>
  </a>
</div>`
}

// Shuffle Array
const shuffleArray = arr => arr
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1])

const displayInstagram = (res, user, instagramBox) => {
  const shuffle = shuffleArray(res.data)
  const sf = shuffle.slice(0, 6)

  const link = document.createElement('a')
  link.classList = 'py-instagram-name button button--large'
  link.href = `https://www.instagram.com/${user}`
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.innerHTML = `<svg class="icon"><use xlink:href="#icon-instagram"></use></svg> ${user}`

  const box = document.createElement('div')
  box.classList = 'py-instagram-content'

  sf.map(img => {
    const images = templateInstagram(img)
    box.innerHTML += images
  })

  instagramBox.classList.remove('u-hide')
  instagramBox.appendChild(box)
  instagramBox.appendChild(link)
}

export default async (instagramFeed, instagramBox) => {
  const url = `https://api.instagram.com/v1/users/${instagramFeed.userId}/media/recent/?access_token=${instagramFeed.token}&count=10&callback=?`

  try {
    const result = await fetchQuote(url)
    displayInstagram(result, instagramFeed.userName, instagramBox)
  } catch (err) {
    instagramBox.remove()
  }
}
