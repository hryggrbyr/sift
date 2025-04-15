# Sift App

Sift is a simple web application built with Node.js and Express. It serves static files, supports single-page application (SPA) routing, and includes a manifest and service worker for Progressive Web App (PWA) functionality.

## Features

- **Static File Serving**: Serves files from the `public` directory.
- **SPA Routing**: Fallback to `index.html` for client-side routing.
- **Manifest File**: Includes a `manifest.json` for PWA metadata.
- **Service Worker**: Caches assets for offline functionality.
- **Dynamic Routes**: Example route to handle user-specific requests (`/user/:id`).

## Project Structure

```
/Users/thomas.rigby/Projects/personal/sift
├── public
│   ├── manifest.json
│   ├── service-worker.js
│   ├── index.html (not included, but expected)
│   └── icons/
│       ├── icon-192x192.png
│       └── icon-512x512.png
├── server.js
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
   cd sift
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

### Notes

- Ensure the `public/icons` directory contains the required icon files (`icon-192x192.png` and `icon-512x512.png`).
- Modify the `manifest.json` and `service-worker.js` as needed to suit your app's requirements.

## License

This project is licensed under the MIT License.
