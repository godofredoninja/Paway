/* global searchSettings */
import GhostSearch from './app/app.search';

document.addEventListener('DOMContentLoaded', () => {
  // Not active
  if (typeof searchSettings === 'undefined') return;

  const $openSearch = document.querySelector('.js-search-toggle');
  const $closeSearch = document.getElementById('search-close');
  // const $search = document.getElementById('search');

  const mySearchSettings = {
    input: '#search-input',
    results: '#search-results',
  };

  Object.assign(mySearchSettings, searchSettings);

  // Remove class u-hide
  $openSearch.classList.remove('u-hide');

  /* Open search */
  $openSearch.addEventListener('click', e =>  {
    // $search.classList.remove('u-hide');
    document.body.classList.add('is-search');
    e.preventDefault();
  });

  /* Close Serach */
  $closeSearch.addEventListener('click', e =>  {
    // $search.classList.add('u-hide');
    document.body.classList.remove('is-search');
    e.preventDefault();
  });

  // Search
  new GhostSearch(mySearchSettings);
});
