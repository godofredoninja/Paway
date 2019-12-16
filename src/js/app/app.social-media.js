export default socialMedia => {
  const urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line

  const templateSocialMedia = (name, url, title) => `
    <a href="${url}" title="Follow me in ${title}" target="_blank" rel="noopener noreferrer">
    <svg class="icon"><use xlink:href="#icon-${name}"></use></svg>
    <span>${name}</span>
  </a>`

  const createPasteElement = box => {
    Object.entries(socialMedia).forEach(([name, urlTitle]) => {
      const url = urlTitle[0]

      if (typeof url === 'string' && urlRegexp.test(url)) {
        const template = templateSocialMedia(name, url, urlTitle[1])

        const li = document.createElement('li')
        li.innerHTML = template
        box.appendChild(li)
      }
    })
  }

  document.querySelectorAll('.js-social-media').forEach(el => createPasteElement(el))
}
