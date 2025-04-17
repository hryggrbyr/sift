const feeds = require("./src/_data/feeds.json");

/**
 * Human-readable Date
 * Returns a date as a string value appropriate to the host environment's current locale.
 * @param {number} value The date to convert. If not provided, the function will use current datetime
 * @param {string} lang The language to use while formatting (optional). Falls back to British English
 * @return {string} The converted date as a human-readable string
 * @example humanReadableDate() // Thursday, December 20, 2012
 * @example humanReadableDate('2013-08-24') // Saturday, 24 August 2013
 * @example humanReadableDate('2013-08-24', 'en-US') // Saturday, August 24, 2013
 * @example humanReadableDate('2013-08-24', 'de-DE') // Samstag, 24. August 2013
*/

const humanReadableDate = (value = null, lang = 'en-GB') => {
  const event = value ? new Date(value) : new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return event.toLocaleDateString(lang, options);
};

module.exports = function (eleventyConfig) {
  // Add passthrough copy for styles.css
  eleventyConfig.addPassthroughCopy("src/css/styles.css");
  eleventyConfig.addPassthroughCopy("src/js/main.js");

  // Add a keys filter to get object keys
  eleventyConfig.addFilter("keys", (obj) => Object.keys(obj));

  eleventyConfig.addFilter("truncate", (str) => str.substr(0, 256));
  
  eleventyConfig.addFilter("humanReadableDate", humanReadableDate);
  

  // Group feeds by the 'group' parameter
  const groupedFeeds = feeds.reduce((acc, feed) => {
    const group = feed.group || "Ungrouped";
    const normalizedGroup = /^[0-9\W]/.test(group) ? "0-9?%$" : group;

    if (!acc[normalizedGroup]) {
      acc[normalizedGroup] = [];
    }
    acc[normalizedGroup].push(feed);
    return acc;
  }, {});

  // Sort the groups alphabetically
  const sortedGroupedFeeds = Object.keys(groupedFeeds)
    .sort()
    .reduce((sortedAcc, key) => {
      sortedAcc[key] = groupedFeeds[key];
      return sortedAcc;
    }, {});

  const groups = Object.keys(sortedGroupedFeeds).map((group) => {
    return {
      name: group,
      feeds: sortedGroupedFeeds[group]
    };
  });

  const dedupedFeeds = feeds.filter(
    (feed, index, self) =>
      index === self.findIndex((f) => f.title === feed.title)
  );

  console.log(
    "FEEEEEEEEDS:",
    feeds.length,
    dedupedFeeds.length,
    dedupedFeeds.sort((a, b) => a.title.localeCompare(b.title))
  );

  // Make feeds.json data available globally
  eleventyConfig.addGlobalData("blogs", dedupedFeeds);

  // Make grouped feeds available globally
  eleventyConfig.addGlobalData("groups", groups);
  eleventyConfig.addGlobalData("groupedFeeds", sortedGroupedFeeds);

  // Specify the input and output directories
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
