// This file contains minimal client-side JavaScript for interactivity, such as handling form submissions or dynamic content updates.

document.addEventListener('DOMContentLoaded', function () {
  // Example: Handle form submission on the settings page
  const settingsForm = document.querySelector('#settings-form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', function (event) {
      event.preventDefault();
      // Handle form submission logic here
      alert('Settings saved!');
    });
  }

  // Example: Dynamic content update for the feed editing page
  const feedEditButton = document.querySelector('#edit-feed-button');
  if (feedEditButton) {
    feedEditButton.addEventListener('click', function () {
      // Logic to edit the feed
      alert('Feed editing initiated!');
    });
  }

  // Prevent default open/close trigger on <summary> and handle [data-open] button
  const detailsElements = document.querySelectorAll('details');
  detailsElements.forEach(details => {
    const summary = details.querySelector('summary');
    const openButton = details.querySelector('[data-open]');

    if (summary && openButton) {
      summary.addEventListener('click', function (event) {
        if (event.target === summary) {
          event.preventDefault(); // Prevent default toggle behavior only if the summary itself is clicked
        }
      });

      openButton.addEventListener('click', function () {
        const isOpen = details.hasAttribute('open');
        if (isOpen) {
          details.removeAttribute('open');
          openButton.textContent = 'Open';
        } else {
          details.setAttribute('open', '');
          openButton.textContent = 'Close';
        }
      });
    }
  });
});
