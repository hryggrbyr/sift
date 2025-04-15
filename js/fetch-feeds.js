import fetch from 'node-fetch';
import fs from 'fs/promises';

export async function fetchNewArticles() {
  try {
    // Fetch feeds from data/feed.json
    const feedsData = await fs.readFile('./data/feed.json', 'utf-8');
    const feeds = JSON.parse(feedsData);

    const newArticles = [];

    for (const feed of feeds) {
      const rssResponse = await fetch(feed.rssUrl); // Assuming each feed has an 'rssUrl' property
      const rssText = await rssResponse.text();

      // Parse RSS feed (basic example, replace with a proper RSS parser if needed)
      const parser = new DOMParser();
      const rssDoc = parser.parseFromString(rssText, 'application/xml');
      const items = rssDoc.querySelectorAll('item');

      items.forEach(item => {
        const title = item.querySelector('title')?.textContent;
        const link = item.querySelector('link')?.textContent;
        const pubDate = item.querySelector('pubDate')?.textContent;

        // Check if the article is new (e.g., based on pubDate or other criteria)
        const isNew = isNewArticle(pubDate, title);
        newArticles.push({ title, link, pubDate, feedName: feed.name, new: isNew });
      });
    }

    // Save new articles to a file
    await fs.writeFile('./data/articles.json', JSON.stringify(newArticles, null, 2));

    return newArticles;
  } catch (error) {
    console.error('Error fetching new articles:', error);
    return [];
  }
}

export function isNewArticle(pubDate, title) {
  // Load existing articles from a file
  let existingArticles = [];
  try {
    const data = fs.readFileSync('./data/articles.json', 'utf-8');
    if (data) {
      existingArticles = JSON.parse(data);
    }
  } catch (error) {
    console.warn('No existing articles found or unable to read data:', error);
  }

  // Check if the article already exists
  const articleExists = existingArticles.some(article => article.title === title);

  if (articleExists) {
    return false;
  }

  // Example logic to determine if an article is new based on pubDate
  const articleDate = new Date(pubDate);
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  return articleDate > oneDayAgo;
}
