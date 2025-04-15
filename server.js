import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.resolve('public')));

// Serve the manifest file
app.get('/manifest.json', (req, res) => {
  res.sendFile(path.resolve('public/manifest.json'));
});

// Serve the service worker
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve('public/service-worker.js'));
});

// Serve the service worker
app.get('/feed.json', (req, res) => {
  res.sendFile(path.resolve('public/data/feed.json'));
});

// Fallback to index.html for SPA routing
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
