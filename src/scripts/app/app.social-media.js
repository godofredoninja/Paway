export default links => {
  const urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line
  const templateSocialMedia = (name, url) => `<a href="${url}" title="Follow me in ${name}" target="_blank" rel="noopener noreferrer" class="godo-tracking"><i class="i-${name}"></i><span>${name}</span></a>`;

  function createPasteElement(parent) {
    Object.entries(links).forEach(([name, url]) => {
      if (typeof url === 'string' && urlRegexp.test(url)) {
        const template = templateSocialMedia(name, url);

        const li = document.createElement('li');
        li.innerHTML = template;
        parent.appendChild(li);
      }
    });
  }

  [].forEach.call(document.querySelectorAll('.social-media'), el => createPasteElement(el));
};
