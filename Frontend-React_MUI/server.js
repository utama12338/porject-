const express = require('express');
const helmet = require('helmet');
const app = express();
const path = require('path');
const envServ = {};
require('dotenv').config({processEnv: envServ});

app.use(helmet());

// Use helmet middleware to set X-Frame-Options header
app.use(helmet.frameguard({ action: 'sameorigin' }));

// Set the Strict-Transport-Security (HSTS) header
app.use(
  helmet.hsts({
    maxAge: 43200, // 0.5 day in seconds
    includeSubDomains: true,
    preload: true,
  })
);

// Set the Content Security Policy (CSP) header
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      connectSrc: ["'self'", "https: 'unsafe-inline'"]
    },
  })
);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
});


