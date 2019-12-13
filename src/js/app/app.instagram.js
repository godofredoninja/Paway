// user id => 1397790551
// token => 1397790551.1aa422d.37dca7d33ba34544941e111aa03e85c7
// user nname => GodoFredoNinja
// http://instagram.com/oauth/authorize/?client_id=YOURCLIENTIDHERE&redirect_uri=HTTP://YOURREDIRECTURLHERE.COM&response_type=token

/* Template for images */
const templateInstagram = data => {
  return `<div class="instagram-col col s6 m4 l2">
  <a href="${data.link}" class="instagram-img u-relative u-block" target="_blank" rel="noopener noreferrer">
    <img class="u-absolute u-image u-block lazyload" data-src="${data.images.standard_resolution.url}"/>
  </a>
</div>`
}

// Shuffle Array
const shuffleInstagram = arr => arr
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1]);

// Display Instagram Images
const displayInstagram = (res, user) => {
  const shuffle = shuffleInstagram(res.data);
  const sf = shuffle.slice(0, 6);

  document.querySelector('.instagram').classList.remove('u-hide');
  const box = document.querySelector('.instagram-wrap');
  document.querySelector('.instagram-name').innerHTML= user;
  // document.querySelector('.instagram-name').appendChild(user);

  sf.map(img => {
    const images = templateInstagram(img);
    box.innerHTML += images;
  });
}

export default (url, user) => {
  // $.get(url).done(function (data){
  //   console.log('posts', data.data);
  // }).fail(function (err){
  //   console.log(err);
  // });

  fetch(url)
  .then(response => response.json())
  .then(resource => displayInstagram(resource, user))
  .catch( () => document.querySelector('.instagram').remove());
  // .catch(error => console.log(error))
}
