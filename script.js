import { displayGroups } from './js/display-groups.js';
import { fetchAndDisplayFeed } from './js/display-feed.js';

// Consolidate DOMContentLoaded event listeners
document.addEventListener('DOMContentLoaded', () => {
  console.log(1)
  fetchAndDisplayFeed();
  console.log(2)
  displayGroups();

  const refreshButton = document.querySelector('.refresh-btn');
  if (refreshButton) {
    refreshButton.addEventListener('click', fetchAndDisplayFeed);
  }
});
