const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5500' }));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/img', (req, res) => {
  res.cookie('UUID', '123456789').send('some data back');
});

app.get('/iframe', (req, res) => {
  res.sendFile(`${__dirname}/public/iframe.html`);
});

app.post('/iframe', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(port, (req, res) => {
  console.log('Server running at http://localhost:3000');
});
