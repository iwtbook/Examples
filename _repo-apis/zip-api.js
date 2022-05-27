// zip-api.js

const fs = require('fs-extra');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const archive = require('simple-archiver').archive;
const contentApiPort = 3001;
const port = 3002;

/**
 * GET request handler
 * Handles incoming requests for ZIP files of specific directories from Github
 * repositories. "repo" (repository) must be specific in the request's query;
 * "dir" (directory) can be specified but not mandatory (The root is used if
 * "dir" is unspecified). Responds with a ZIP file of the specified directory
 * from the specified repo (if found).
 */
app.get('/', async (req, res, next) => {
  if (!req.query.repo) {
    res.status(400).send('"repo" must be specified in query');
    return;
  }
  // Grab the repo and grid from the query string
  const repo = req.query.repo;
  const dir = req.query?.dir ? req.query.dir : '';

  let repoData, files;

  try {
    // Fetch all of the relevent individual file URLs
    repoData = await fetchRepoData(repo, dir);
  } catch (err) {
    res.status(500).send(err);
    return;
  }

  try {
    // Fetch all of the files from the fetches URLs
    files = await fetchFiles(repoData);
  } catch (err) {
    res.status(500).send(err);
    return;
  }

  // Grab a timestamp for a unique directory
  const timestamp = new Date().getTime();

  // Grab the filename for the zip and make a directory for it
  let zipFileName = dir;
  zipFileName = zipFileName.split('/').pop();

  // Write each of the files to disk
  let excludedFiles = [
    'demo-config.json',
    'learn.md',
    'resources.md',
    'quiz.md',
    'media',
  ];
  files.forEach((file) => {
    if (excludedFiles.includes(file.name)) return;
    fs.outputFileSync(`temp-${timestamp}/${file.name}`, file.data);
  });

  // Update the data for each of the files
  files.map((file) => {
    file.type = 'file';
    file.data = `temp-${timestamp}/${file.name}`;
    return file;
  });

  // Compress all of the files to a zip file
  await archive(files, {
    format: 'zip',
    output: `temp-${timestamp}/${zipFileName}.zip`,
  });

  // Send back the zip file to download
  res.download(
    `${__dirname}/temp-${timestamp}/${zipFileName}.zip`,
    `${zipFileName}.zip`,
    (err) => {
      if (err) {
        next(err);
      } else {
        // Remove the directory once complete
        fs.rmSync(`temp-${timestamp}`, {
          recursive: true,
          force: true,
        });
        // Lof that it was downloaded
        console.log(
          `Downloaded: ${__dirname}/temp-${timestamp}/${zipFileName}.zip`
        );
      }
    }
  );
});

/**
 * OPTIONS request handler
 * Respond with OPTIONS and GET as allowed HTTP methods
 */
app.options('/', (req, res) => {
  res.set('Allow', 'OPTIONS, GET');
  res.status(204).send();
});

/**
 * Generic request handler
 * Block all HTTP methods that haven't been specifically handled above
 */
app.all('/', (req, res) => {
  res.status(405).send('Only OPTIONS & GET requests are permitted');
});

/**
 * Start the server and listen for inbound requests
 */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/****************************/
/***** HELPER FUNCTIONS *****/
/****************************/

/**
 * Fetches a list of files from the specified repo & subdirectory. This list
 * contains the URL with which to fetch the data of these files.
 * @param {string} repo the GitHub repository to fetch from
 * @param {string} dir (optional) the desired subdirectory in the repository
 * @returns {promise<array>} When the promise successfully resolves, an array of
 *                           objects containing the URL of the raw file data. A
 *                           an error message string if rejected
 */
async function fetchRepoData(repo, dir) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:${contentApiPort}/${repo}`)
      .then((response) => response.json())
      .then((data) => {
        // Make sure the files are in the correct directory and are not a
        // directory themselves. blob --> binary large object, meaning file
        let files = data.tree.filter((obj) => {
          return obj.path.startsWith(dir) && obj.type == 'blob';
        });
        // Format files so the filename and URL are easily accessible
        files = files.map((file) => {
          let fileName = file.path.slice(dir.length + 1);
          return {
            fileName: fileName,
            url: file.url,
          };
        });
        // Resolve the finished file
        resolve(files);
      })
      .catch((err) => {
        // Log to the console & reject the promise
        console.error(`Error Fetching Repository: ${err}`);
        reject(`Error Fetching Repository: ${err}`);
      });
  });
}

/**
 * Fetches all of the file data from the supplied files (that were fetched from
 * the repo using fetchRepoData())
 * @param {array<object>} files the desired files to fetch. the output of
 *                              fetchRepoData() formats this parameter for you
 * @returns {array<object>} the base64-decoded data of the given files
 */
async function fetchFiles(files) {
  return new Promise((resolve, reject) => {
    const downloaded = []; // Where the downloaded files will be stored
    files.forEach((file) => {
      fetch(file.url)
        .then((response) => response.json())
        .then((data) => {
          // Push the newly downloaded content into the array
          downloaded.push({
            name: file.fileName,
            type: 'string',
            // The buffer converts the content from base64 encoding
            data: Buffer.from(data.content, 'base64').toString('utf-8'),
          });
          // Resolve if that was the final file to be added to the array
          if (downloaded.length == files.length) resolve(downloaded);
        })
        .catch((err) => {
          // Log to the console & reject the promise
          console.error(`Error while fetching a file: ${err}`);
          reject(`Error while fetching a file: ${err}`);
        });
    });
  });
}
