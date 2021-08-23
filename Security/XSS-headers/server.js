const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

const policy = `default-src 'self'; script-src 'sha256-MTFL3uKeCWcbWQ0nJBnAJ55XaMaF71bhyKhe5Px1IL4='`;
// const policy = `script-src 'self'; default-src 'self'`;

app.get('/secure', (req, res) => {
  res.set('Content-Security-Policy', policy);
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/insecure', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
