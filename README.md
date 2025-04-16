# Sift App

Sift is a web application built with Eleventy for static site generation. It fetches and processes RSS feeds, caches responses for performance, and organizes content dynamically.

## Features

- **RSS Feed Aggregation**: Fetches and processes RSS feeds, caching responses for up to 1 year.
- **Dynamic Content Grouping**: Groups feeds by categories and flags new articles.
- **Static Site Generation**: Built with Eleventy for fast and efficient static site generation.
- **Dark/Light Mode Support**: CSS variables for theme switching.
- **Progressive Enhancement**: Includes modern web features like responsive design and accessibility.

## Project Structure

```
/Users/thomas.rigby/Projects/personal/sift--v2
├── src
│   ├── _data
│   │   ├── feeds.json
│   │   └── rss.js
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── main.js
│   └── templates
│       └── feed.njk
├── dist
│   └── ... (generated output)
├── .eleventy.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sift--v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the Eleventy build:
   ```bash
   npx @11ty/eleventy
   ```

4. Start the development server:
   ```bash
   npx @11ty/eleventy --serve
   ```

5. Open the app in your browser:
   ```
   http://localhost:8080
   ```

### Notes

- Ensure `feeds.json` contains valid RSS feed URLs.
- Modify `rss.js` to customize RSS fetching and caching behavior.
- Use `styles.css` to adjust the site's appearance.

## License

This project is licensed under the MIT License.
