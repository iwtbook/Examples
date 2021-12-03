const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5500' }));

app.get('/', (req, res) => {
  res.json(req.query);
});

app.post('/', (req, res) => {
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`form-echo.js listening at http://localhost:${3000}`);
});
