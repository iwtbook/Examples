// endpoint-ws.js

const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const expressWs = require('express-ws')(app);
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'Thomas Powell' }));

const db = {
  staticData: [],
  clickEvents: []
};

const idList = [];

// Returns every entry in the specified collection
app.get('/db/:collection', cors(), (req, res) => {
  // Check to make sure given collection variable is valid
  if (!Object.keys(db).includes(`${req.params.collection}`)) {
    res.status(400).send('Unrecognized Collection');
  }

  res.send(db[req.params.collection]);
});

// Returns the specified entry if found
app.get('/db/:collection/:id', cors(), (req, res) => {
  // Check to make sure given collection variable is valid
  if (!Object.keys(db).includes(`${req.params.collection}`)) {
    res.status(400).send('Unrecognized Collection');
  }

  // Make sure there was an id given and it's of the correct length
  let match = db[req.params.collection].filter(entry => entry['_id'] == req.params.id);
  if (match.length == 1) {
    res.send(match[0]);
  } else {
    res.status(400).send('Error retrieving record for that ID');
  }
});

/** WebSockets - Begin **/

app.ws('/', (ws, req) => {
  ws.on('message', data => {
    data = JSON.parse(data);
    // Check to make sure given collection variable is valid
    if (!Object.keys(db).includes(`${data.collection}`)) {
      res.status(400).send('Unrecognized Collection');
    }

    // Function to call if request is malformed, sends back a 400 code
    function _malformedRequest() {
      return res.status(400).send('Data Received is Malformed');
    }

    // Make sure incoming data is formed correctly and has a body
    if (!Array.isArray(data.body)) {
      return _malformedRequest();
    }

    // Make sure all of the values in the array are formatted correctly
    let keysToCheck = [];
    if (data.collection == 'clickEvents') {
      keysToCheck = ['client', 'page'];
    } else if (data.collection == 'staticData') {
      keysToCheck = [
        'outerWidth','outerHeight','innerWidth', 
        'innerHeight','userAgent','language'
      ];
    }
    data.body.forEach(entry => {
      for (const key in entry) {
        if (!keysToCheck.includes(key)) {
          return _malformedRequest();
        }
      }
    });

    /**
     * Generates a unqiue ID to use for new entries
     * @returns {string} A generated unique ID
     */
    function _generateUniqueID() {
      const charList = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let uniqueID;
      do {
        uniqueID = '';
        for (let i = 0; i < 24; i++) {
          uniqueID += charList.charAt(Math.floor(Math.random() * charList.length));
        }
      } while (idList.includes(uniqueID));
      idList.push(uniqueID);
      return uniqueID;
    }

    // Add SessionID to each entry and then push to db object
    let insertedCount = 0;
    let insertedIDs = [];
    data.body.forEach(entry => {
      entry['sessionID'] = req.sessionID;
      entry['_id'] = _generateUniqueID();
      db[data.collection].push(entry);
      insertedIDs.push(entry['_id'] );
      insertedCount += 1;
    });

    ws.send(JSON.stringify({
      result: 'success',
      insertedCount: insertedCount,
      insertedIds: insertedIDs
    }));
  });

});

/** WebSockets - End **/

// For options request, send 204 ok no data
app.options('/', cors(), (req, res) => {
  res.status(204).end();
});

// For everything else, send 405 method not allowed
app.all('/', cors(), (req, res) => {
  res.status(405).end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://127.0.0.1:${port}`);
});
