export default links => {
  const urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line

  const box = document.querySelectorAll('.social-media');

  [].forEach.call(box, el => {

    Object.entries(links).forEach(([name, url]) => {
      if (typeof url === 'string' && urlRegexp.test(url)) {
        const template = `<a href="${url}" title="Follow me in ${name}" target="_blank" rel="noopener noreferrer" class="godo-tracking">
          <i class="i-${name}"></i>
          <span>${name}</span>
        </a>`;

        const li = document.createElement('li');
        li.innerHTML = template;
        el.appendChild(li);
      }
    });

  });
};
