# 🌱 Sift — A Self-Hosted RSS + Read-Later PWA

Sift is a minimalist, self-hosted RSS reader, bookmark manager, and read-later tool — all in one. It’s a touch-optimized PWA built with HTML, vanilla JS, CUBE CSS, and Node.js (via Netlify Functions). No DBs, no accounts — just you and your content.

---

## 🚀 Features

- Offline-first Progressive Web App (PWA)
- Import RSS feeds via OPML or manually
- Organize feeds alphabetically, or into smart folders (`Liked`, `Read Later`, `Hoard`, `_burn`)
- Swipe-based triage: Left for Read Later, Right for Liked
- Share articles via Web Share API
- Articles auto-removed when marked read
- Built-in dark mode inspired by [thomasrigby.com](https://thomasrigby.com)

---

## 📁 Folder Structure

```
/public           → HTML + manifest + service worker
/src              → CSS (CUBE), minimal JS
/netlify/functions → NodeJS-powered backend (OPML, feed parsing, state changes)
/data             → JSON persistence for feeds, articles, and state
```

---

## 🧠 User Workflow

- Import or add feeds → auto-grouped by title
- App fetches fresh articles on open/refresh
- Swipe:
  - Left → Read Later → then Hoard
  - Right → Liked
- Long press to share
- Mark folders “Read All” to clear content
- Data stored in JSON files for self-hosted simplicity

---

## 📦 Deployment

1. Clone this repo
2. Push to GitHub
3. Connect to Netlify → deploy main branch
4. Done! Your offline RSS PWA is live

---

## 📬 Endpoints (Netlify Functions)

| Endpoint              | Description                           |
|-----------------------|---------------------------------------|
| `import-opml.js`      | Import RSS feeds from OPML/XML        |
| `add-feed.js`         | Add a single RSS feed manually        |
| `fetch-feeds.js`      | Fetch and cache fresh articles        |
| `get-articles.js`     | Retrieve current articles (filtered)  |
| `mark-read.js`        | Mark article(s) as read               |
| `toggle-liked.js`     | Toggle liked state on an article      |
| `toggle-readlater.js` | Toggle read-later/hoard state         |
| `full-text.js`        | Fetch and parse full-text content     |

---

## ⚙️ Local Dev (Optional)

```bash
npm install -g netlify-cli
netlify dev
```

Uses local Netlify Functions for backend.

---

## 📝 License

MIT — Made for readers who like to hoard tabs. ✨
