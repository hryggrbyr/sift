const EleventyFetch = require("@11ty/eleventy-fetch");
const Parser = require("rss-parser");
const feeds = require("./feeds.json");
const crypto = require("crypto");

const parser = new Parser();

module.exports = async function () {
  const ONE_YEAR = 60 * 60 * 24 * 365; // 1 year in seconds
  const cache = new Map();

  const fetchFeed = async (url) => {
    try {
      const response = await EleventyFetch(url, {
        duration: `${ONE_YEAR}s`,
        type: "text", // Fetch as plain text
        fetchOptions: {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Eleventy/1.0)"
          }
        }
      });

      // Parse the RSS feed using rss-parser
      return await parser.parseString(response);
    } catch (error) {
      console.error(`Failed to fetch or parse ${url}:`, error);
      return null;
    }
  };

  const hashArticles = (articles) =>
    articles.map((article) =>
      crypto.createHash("md5").update(article.link || article.guid || "").digest("hex")
    );

  const processFeed = async (feed) => {
    const data = await fetchFeed(feed.url);
    if (!data || !data.items) return { ...feed, items: [] };

    const newArticles = [];
    const feedHash = cache.get(feed.url) || new Set();

    const currentHashes = hashArticles(data.items);
    currentHashes.forEach((hash, index) => {
      if (!feedHash.has(hash)) {
        newArticles.push({ ...data.items[index], isNew: true });
        feedHash.add(hash);
      }
    });

    cache.set(feed.url, feedHash);
    return { ...feed, items: data.items.map((item, i) => ({ ...item, isNew: currentHashes[i] in newArticles })) };
  };

  const results = await Promise.all(feeds.map(processFeed));
  return results;
};
