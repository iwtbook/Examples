// server.main.js

const express = require('express');
const app = express();
const port = 3000;

app.use('/public', express.static(__dirname + '/public'));

app.get('/withCSP', (req, res) => {
  let options = {
    headers: {
      'Content-Security-Policy': `default-src 'self'; script-src 'sha256-fxFySRzD+8LPz0uDM/VyPnZ7Cu16vFBN40VATi62wF8='`
    }
  };

  let fileName = __dirname + '/withCSP.html';
  res.sendFile(fileName, options);
});

app.get('/withoutCSP', (req, res) => {
  let fileName = __dirname + '/withoutCSP.html';
  res.sendFile(fileName);
});

app.get('/json', (req, res) => {
  res.json({ 'msg': 'success' });
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
