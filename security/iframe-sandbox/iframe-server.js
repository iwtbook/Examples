const express = require('express');
const app = express();
const port = 3001;

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/iframe-index.html');
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
