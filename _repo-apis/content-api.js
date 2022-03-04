// content-api.js

const fs = require('fs');
const express = require('express');
const mime = require('mime-types');
const app = express();
const port = 3001;

// Files & Directories to exclude from the repo search
const exclude = ['README.md', 'node_modules'];
// List of supported repos, currently only this repo is supported
const supportedRepos = ['examples'];

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

/********************************/
/***          ROUTES          ***/
/********************************/

/**
 * Fetches all of the file paths for every file (and a URL to reach the file
 * contents at) in a given repository
 * @param {string} repo the repository to get all of the files from
 * @return {array<object>} an array of all of the files found, formatted with
 *         their path, their type (all will be of type 'blob') and a URL to
 *         fetch the file from
 */
app.get('/:repo', (req, res) => {
  // Right now only the examples repo is supported
  if (!supportedRepos.includes(req.params.repo)) {
    res.status(400).send('Repo not supported');
    return;
  }
  // The string path to the current repo we are in
  const repoDir = getCurrentRepo();
  // All of the desired files in our current repo
  let files = recursiveFileSearch(repoDir, exclude, []);
  // Format the files so that they are easily parsable
  files = files.map((file) => {
    let urlSafeRoute = encodeURI(file);
    file = file.replaceAll(repoDir + '/', '');
    return {
      path: file,
      type: 'blob',
      url: `http://localhost:${port}/${req.params.repo}/file${urlSafeRoute}`,
      currNum: 1,
      totalNum: 93,
    };
  });
  // If directory specified, filter out files not in that directory
  if (req.query.dir) {
    files = files.filter((file) => file.path.startsWith(req.query.dir));
  }
  // Send the files back
  res.json({ tree: files });
});

/**
 * Fetches the contents and metadata of the specified file from the specified repo
 * @param {string} repo the repository to fetch the file from
 * @param {string} file/* the file to grab the data of
 * @return {object} the contents of the specified file and some other metadata
 *                  on the file
 */
app.get('/:repo/file/*', (req, res) => {
  // Right now only the examples repo is supported
  if (!supportedRepos.includes(req.params.repo)) return;
  // Everything after file/ must be the file path
  const filePath = '/' + decodeURI(req.params['0']);
  // Grab the contents of the file
  let fileContentsPath = filePath;
  let currRepoPath = getCurrentRepo();
  if (!filePath.includes(currRepoPath))
    fileContentsPath = currRepoPath + filePath;
  const fileContents = fs.readFileSync(fileContentsPath, 'utf8');
  // Format everything and send it back
  res.json({
    path: filePath,
    content: Buffer.from(fileContents).toString('base64'),
    encoding: 'base64',
  });
});

/**
 * Fetches the direct contents of the specified file from the specified repo.
 * Has no MIME type so it can be read as plain text
 * @param {string} repo the repository to fetch the file from
 * @param {string} contents/* the file to grab the contents of
 * @return {object} the contents of the specified file and some other metadata
 *                  on the file
 */
app.get('/:repo/contents/*', (req, res) => {
  // Right now only the examples repo is supported
  if (!supportedRepos.includes(req.params.repo)) return;
  // Everything after file/ must be the file path
  const filePath = getCurrentRepo() + '/' + decodeURI(req.params['0']);
  // Grab the contents of the file
  const fileContents = fs.readFileSync(filePath, 'utf8');
  // Send it back
  res.send(fileContents);
});

/**
 * Fetches the direct contents of the specified file from the specified repo;
 * attaches the correct MIME type to the file so it gets rendered properly
 * @param {string} repo the repository to fetch the file from
 * @param {string} contents/* the file to grab the contents of
 * @return {object} the contents of the specified file and some other metadata
 *                  on the file
 */
app.get('/:repo/contents-mime/*', (req, res) => {
  // Right now only the examples repo is supported
  if (!supportedRepos.includes(req.params.repo)) return;
  // Everything after file/ must be the file path
  const filePath = getCurrentRepo() + '/' + decodeURI(req.params['0']);
  // Send it back with the right mime type
  res.set('Content-Type', mime.lookup(filePath.split('.').pop()));
  res.sendFile(filePath);
});

/**
 * Begins the server, starts listening for incoming requests.
 * Not technically a route.
 */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/******************************************/
/***          HELPER FUNCTIONS          ***/
/******************************************/

/**
 * Gets the path of the current repo (not __dirname since this is in a subfolder)
 * @returns {string} the path of the current directory
 */
function getCurrentRepo() {
  let repoDir = __dirname.split('/');
  repoDir.pop();
  return repoDir.join('/');
}

/**
 *
 * @param {string} dir the directory with which to search for files
 * @param {array<string>} exclude A list of files / directories to exclude in
 *                                file search
 * @returns {array<string>} an array of all of the paths of the found files
 */
function recursiveFileSearch(dir, exclude) {
  let entitiesInDir, dirsInDir, filesInDir;
  // Get everything in the directory first
  entitiesInDir = fs.readdirSync(dir);
  // Filter out everything that's not allowed
  entitiesInDir = entitiesInDir.filter((entity) => {
    if (exclude.includes(entity)) return false;
    if (entity.charAt(0) == '.' || entity.charAt(0) == '_') return false;
    return true;
  });
  // Separate the directories and files
  filesInDir = [];
  dirsInDir = entitiesInDir.filter((entity) => {
    // if it's a directory keep it so it can be stored in dirsInDir
    if (fs.lstatSync(`${dir}/${entity}`).isDirectory()) return true;
    // otherwise add it to our list of files
    filesInDir.push(`${dir}/${entity}`);
    // and filter it out by returning false
    return false;
  });
  // Add all of the files in the directories we found in our main files array
  dirsInDir.forEach((subDir) => {
    filesInDir = filesInDir.concat(recursiveFileSearch(`${dir}/${subDir}`, []));
  });
  // Return our main files array
  return filesInDir;
}
