const feeds = require("./src/_data/feeds.json");

module.exports = function (eleventyConfig) {
  // Add passthrough copy for styles.css
  eleventyConfig.addPassthroughCopy("src/css/styles.css");
  eleventyConfig.addPassthroughCopy("src/js/main.js");

  // Add a keys filter to get object keys
  eleventyConfig.addFilter("keys", function (obj) {
    return Object.keys(obj);
  });

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
