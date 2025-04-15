(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // js/fetch-feeds.js
  function fetchNewArticles() {
    return __async(this, null, function* () {
      try {
        const response = yield fetch("/feed.json");
        const feeds = yield response.json();
        if (feeds.length === 0) {
          console.warn("No feeds found in feed.json");
          return [];
        }
        const newArticles = [];
        for (const feed of feeds) {
          const rssResponse = yield fetch(feed.rssUrl);
          const rssText = yield rssResponse.text();
          const parser = new DOMParser();
          const rssDoc = parser.parseFromString(rssText, "application/xml");
          const items = rssDoc.querySelectorAll("item");
          items.forEach((item) => {
            var _a, _b, _c;
            const title = (_a = item.querySelector("title")) == null ? void 0 : _a.textContent;
            const link = (_b = item.querySelector("link")) == null ? void 0 : _b.textContent;
            const pubDate = (_c = item.querySelector("pubDate")) == null ? void 0 : _c.textContent;
            const isNew = isNewArticle(pubDate, title);
            newArticles.push({ title, link, pubDate, feedName: feed.name, new: isNew });
          });
        }
        localStorage.setItem("articles", JSON.stringify(newArticles));
        return newArticles;
      } catch (error) {
        console.error("Error fetching new articles:", error);
        return [];
      }
    });
  }
  function isNewArticle(pubDate, title) {
    let existingArticles = [];
    try {
      const data = localStorage.getItem("articles");
      existingArticles = data ? JSON.parse(data) : [];
    } catch (error) {
      console.warn("No existing articles found or unable to read data:", error);
    }
    const articleExists = existingArticles.some((article) => article.title === title);
    if (articleExists) {
      return false;
    }
    const articleDate = new Date(pubDate);
    const oneDayAgo = /* @__PURE__ */ new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    return articleDate > oneDayAgo;
  }

  // js/display-feed.js
  function fetchAndDisplayFeed() {
    return __async(this, null, function* () {
      try {
        const response = yield fetch("/feed.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const feedData = yield response.json();
        const feedContainer = document.getElementById("feed-container");
        if (!feedContainer) {
          console.error("Feed container div not found in the DOM.");
          return;
        }
        feedContainer.innerHTML = feedData.map((item) => `
      <div class="feed-item">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `).join("");
      } catch (error) {
        console.error("Error fetching or displaying feed:", error);
      }
    });
  }

  // script.js
  document.addEventListener("DOMContentLoaded", () => {
    fetchNewArticles();
    fetchAndDisplayFeed();
  });
  var refreshButton = document.getElementById("refresh-feeds-button");
  if (refreshButton) {
    refreshButton.addEventListener("click", () => {
      fetchNewArticles();
    });
  }
})();
