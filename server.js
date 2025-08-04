const express = require('express');
const path = require('path');

const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/download.svg', express.static(path.join(__dirname, 'icons/download.svg')));
app.use('/logo.svg', express.static(path.join(__dirname, 'icons/logo.svg')));

// Serve the static files produced by Parcel
app.use(express.static(path.join(__dirname, 'dist')));

const env = {
  API_KEY: process.env.TYPESENSE_API_KEY,
  HOST: process.env.TYPESENSE_HOST || 'localhost',
  PORT: process.env.TYPESENSE_PORT || 3000,
  PROTOCOL: process.env.TYPESENSE_PROTOCOL || 'http'
};
app.get('/typesense-config.js', (req, res) => {
  res.type('application/javascript');
  res.send(`window.ENV = ${JSON.stringify(env)};`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
