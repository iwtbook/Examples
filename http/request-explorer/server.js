// server.js

const express = require('express');
const { XMLParser } = require('fast-xml-parser');
const YAML = require('yaml');
const parseXML = new XMLParser();
const app = express();
const port = 3005;

app.use(express.raw({type: '*/*'}));

// The POST request handler for the route /
app.post('/', (req, res) => {
  // Set the appropriate headers to pass CORS restrictions
  res.set('Access-Control-Allow-Origin', 'https://*.introweb.tech/*');
  res.set('Access-Control-Allow-Headers', '*');
  // Grab the request body, content type, and encoding (if applicable)
  let body = req.body.toString('utf-8');
  let contentType = req.get('Content-Type');
  let encoding = req.get('Content-Transfer-Encoding');
  // Decode the body into a regular object
  body = decodeContentType(body, contentType, encoding);
  // Send this object as a string back to the user
  res.send(JSON.stringify(body));
});

// The OPTIONS request handler (pre-flight automatic request the browser makes
// for POST requests). Retunrs the appropriate headers for our demos.
app.options('/*', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://*.introweb.tech/*');
  res.set('Access-Control-Allow-Headers', '*');
  res.status(204).send();
});

// Starts up the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


// Helper Functions

/**
 * Decodes a given string to no longer be URI encoded
 * @param {string} val A URI encoded value
 * @returns A URI decoded value
 */
function decodeVal(val) {
  val = decodeURIComponent(val);
  val = val.replaceAll('%21', '!');
  val = val.replaceAll('%28', '(');
  val = val.replaceAll('%29', ')');
  val = val.replaceAll('%27', '\'');
  return val;
}

/**
 * Decodes the given body with the given parameters and returns a parsed object
 * @param {string} body the body of the request that was received
 * @param {string} type the content-type of the body
 * @param {string} encoding (optional) if the string isn't UTF-8, this is what
 *                          the string is encoded as (e.g. 'base64')
 * @returns {object} The parsed version of the given body
 */
function decodeContentType(body, type, encoding) {
  switch (type) {
    case 'application/x-www-form-urlencoded':
      bodySplit = body.split('&');
      body = {};
      bodySplit.forEach(entry => {
        entry = entry.split('=');
        body[decodeVal(entry[0])] = decodeVal(entry[1]);
      });
      break;
    case 'text/plain':
      if (encoding) {
        // Converts from base64 to string, recommended over atob() in Node.js
        body = Buffer.from(body, 'base64').toString('utf-8');
      }
      bodySplit = body.split(',');
      body = {};
      bodySplit.forEach(entry => {
        entry = entry.split('=');
        body[decodeVal(entry[0])] = decodeVal(entry[1]);
      });
      break;
    case 'text/xml':
      body = parseXML.parse(body).vote;
      body.comment = decodeURIComponent(body.comment);
      break;
    case 'application/json':
      body = JSON.parse(body);
      body.comment = decodeURIComponent(body.comment);
      break;
    case 'text/x-yaml':
      body = YAML.parse(body);
      body.comment = decodeURIComponent(body.comment);
      break;
  }
  // Make sure the rating is of type number
  body.rating = Number(body.rating);
  return body;
}