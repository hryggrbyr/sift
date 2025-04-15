export async function fetchAndDisplayFeed() {
  try {
    const response = await fetch('/data/feed.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const feedData = await response.json();

    const feedContainer = document.getElementById('feed-container');
    if (!feedContainer) {
      console.error('Feed container div not found in the DOM.');
      return;
    }

    feedContainer.innerHTML = feedData.map(item => `
      <div class="feed-item">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error fetching or displaying feed:', error);
  }
}
