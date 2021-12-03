// server.js

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.ws('/', (ws, req) => {
  ws.on('message', msg => {
    ws.send(msg);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
