// server-other.js

const express = require('express');
const app = express();
const port = 3001;

app.get('/jsonAllowOrigin', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ 'msg': 'success' });
});

app.get('/jsonNotAllowed', (req, res) => {
  res.json({ 'msg': 'success' });
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
