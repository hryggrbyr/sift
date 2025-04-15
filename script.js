import { fetchNewArticles } from './js/fetch-feeds.js';
import { fetchAndDisplayFeed } from './js/display-feed.js';

// Run fetchNewArticles on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchNewArticles();
  fetchAndDisplayFeed();
});

// Add event listener for "Refresh Feeds" button
const refreshButton = document.getElementById('refresh-feeds-button');
if (refreshButton) {
  refreshButton.addEventListener('click', () => {
    fetchNewArticles();
  });
}
