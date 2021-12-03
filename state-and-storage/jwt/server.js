// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:5500' }));

function generateKey() {
  let secretKey = '';
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 24; i++) {
    secretKey += charset.charAt(Math.floor(Math.random() * (charset.length)));
  }
  return secretKey;
}

const secretKey = generateKey();

app.get('/api', (req, res) => {
  res.json({
    message: 'Here there! Welcome to this API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    let pw = '';
    for (let i = 0; i < authData.user.password.length; i++) pw += '*';
    authData.user.password = pw;
    if (err) {
      res.sendStatus(401);
    } else {
      res.json({
        message: 'Posts created',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  if (!req.body?.username || !req.body?.email || !req.body?.password) {
    res.sendStatus(403);
  }

  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }

  jwt.sign({ user: user }, secretKey, (err, token) => {
    res.json({ token })
  });
});

function verifyToken(req, res, next) {
  const bearerToken = req.headers['authorization'];
  if (typeof bearerToken !== 'undefined') {
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(3000, (req, res) => {
  console.log('Server running at http://localhost:3000');
});
