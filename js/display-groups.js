export function displayGroups() {
  // Fetch feeds from data/feed.json
  fetch('/data/feed.json')
    .then(response => response.json())
    .then(feeds => {
      // Sort feeds by the 'group' parameter
      const groupedFeeds = feeds.reduce((acc, feed) => {
        let group = feed.group || 'Ungrouped';

        // Check if the group is a number, punctuation, or symbol
        if (/^[0-9\W]+$/.test(group)) {
          group = '0-9 %$£';
        }

        if (!acc[group]) acc[group] = [];
        acc[group].push(feed);
        return acc;
      }, {});

      // Get the container element
      const container = document.getElementById('groups-container');

      console.log('Grouped Feeds:', groupedFeeds);
      // Create summary/details pairs for each group
      Object.keys(groupedFeeds).sort().forEach(group => {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = group;

        // Add "Open/Close" button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Open';
        toggleButton.addEventListener('click', () => {
          details.open = !details.open;
          toggleButton.textContent = details.open ? 'Close' : 'Open';
        });
        summary.appendChild(toggleButton);

        // Add "View" button
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.addEventListener('click', () => {
          const feedsContainer = document.getElementById('feed-container');
          feedsContainer.innerHTML = ''; // Clear existing content

          groupedFeeds[group].forEach(feed => {
            const feedItem = document.createElement('div');
            feedItem.textContent = feed.title; // Assuming each feed has a 'title' property
            feedsContainer.appendChild(feedItem);
          });
        });
        summary.appendChild(viewButton);

        details.appendChild(summary);

        const list = document.createElement('ul');
        groupedFeeds[group].forEach(feed => {
          const listItem = document.createElement('li');
          listItem.textContent = feed.title; // Assuming each feed has a 'name' property
          list.appendChild(listItem);
        });

        details.appendChild(list);
        container.appendChild(details);
      });
    })
    .catch(error => console.error('Error fetching feeds:', error));
}
