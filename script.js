import { fetchNewArticles } from './js/fetch-feeds.js';

// Run fetchNewArticles on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchNewArticles();
});

// Add event listener for "Refresh Feeds" button
const refreshButton = document.getElementById('refresh-feeds-button');
if (refreshButton) {
  refreshButton.addEventListener('click', () => {
    fetchNewArticles();
  });
}
