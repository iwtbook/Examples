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
 * Fetches a list of all of the demos in a given repo
 * @param {string} repo the repository to fetch the demos from
 * @return {array<string>} an array of all of the demos in alphabetical order
 */
app.get('/:repo/demos', (req, res) => {
  // Right now only the examples repo is supported
  if (!supportedRepos.includes(req.params.repo)) {
    res.status(400).send('Repo not supported');
    return;
  }
  // The string path to the current repo we are in
  const repoDir = getCurrentRepo();
  // All of the desired files in our current repo
  let files = recursiveFileSearch(repoDir, exclude);
  // Filter out anything that isn't an demo-config.json path
  files = files.filter((file) => file.endsWith('/demo-config.json'));
  // Remove the repoDir and demo-config.json from the file paths
  files = files.map((file) => {
    file = file.replaceAll(repoDir + '/', '');
    return file.replace('/demo-config.json', '');
  });
  // Filter down anything that isn't in the specified dir
  if (req.query.dir) {
    files = files.filter((file) => file.startsWith(req.query.dir));
  }

  res.json(files);
});

/**
 * Fetches a list of all of the demos and which frames they use
 * @param {string} repo the repository to fetch the demos from
 * @return {array<string>} an array of all of the demos in alphabetical order
 *                         with the frames they use
 */
app.get('/:repo/demo-frames', (req, res) => {
  // Right now only the examples repo is supported
  if (!supportedRepos.includes(req.params.repo)) {
    res.status(400).send('Repo not supported');
    return;
  }
  // The string path to the current repo we are in
  const repoDir = getCurrentRepo();
  // All of the desired files in our current repo
  let files = recursiveFileSearch(repoDir, exclude);
  // Filter out anything that isn't an demo-config.json path
  files = files.filter((file) => file.endsWith('/demo-config.json'));
  files = files.map((file) => {
    // Read the config for each file
    let config = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
    // Format the file name to something cleaner
    let path = file.replaceAll(repoDir + '/', '');
    path = path.replace('/demo-config.json', '');
    // Grab the frames and make a new formatted object
    let demoFrame = {
      path: path,
      frames: config.settings?.frames,
      title: config.metadata?.title,
    };
    // Check for website and add if needed
    if (config.website) {
      demoFrame.website = config.website;
    }
    // Check for media config and add it if needed
    let mediaConfigPath = `${repoDir}/${path}/media/media-config.json`;
    if (fs.existsSync(mediaConfigPath)) {
      let options = { encoding: 'utf8' };
      let mediaConfig = JSON.parse(fs.readFileSync(mediaConfigPath, options));
      demoFrame.media = mediaConfig;
    }
    return demoFrame;
  });
  // Send the files back
  res.json(files);
});

/**
 * Fetches the contents and metadata of the specified file from the specified repo
 * @param {string} repo the repository to fetch the file from
 * @param {string} file the file to grab the data of
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
  if (!filePath.includes(currRepoPath)) {
    fileContentsPath = currRepoPath + filePath;
  }
  const fileContents = fs.readFileSync(fileContentsPath);
  // Format everything and send it back
  res.json({
    path: filePath,
    content: fileContents.toString('base64'),
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
 * Fetches just the demo-config.json and dir-config.json files from the repo and converts them
 * to an easy to use format
 * @return {object}
 */
app.get('/:repo/route-configs', (req, res) => {
  let currentRepo = getCurrentRepo();

  // Get every single file in all of the demos
  let allFiles = recursiveFileSearch(currentRepo, exclude, []);
  // Get just the list of demos we care about
  let demoList = allFiles.filter((file) => file.endsWith('/demo-config.json'));
  demoList = demoList.map((file) => {
    file = file.replace(currentRepo + '/', '');
    return file.replace('/demo-config.json', '');
  });

  // The final routeConfig to return
  let routeConfigs = [];
  demoList.forEach((file) => {
    // Get an array of all of the directories in the path
    let directory = file.split('/');
    let currItems = routeConfigs;
    let currDir = '';
    // Loop over all of the individual directories
    for (let i = 0; i < directory.length; i++) {
      // Keep track of where we are to read the file later
      currDir += `/${directory[i]}`;
      // Grab the current directory if it exists in our object
      let currConf = currItems.filter((conf) => {
        return conf.currTitle == directory[i];
      });
      // If it doesn't exist and it's a directory, add it
      if (currConf.length == 0 && i < directory.length - 1) {
        let config = JSON.parse(
          fs.readFileSync(`${currentRepo}${currDir}/dir-config.json`, 'utf8')
        );
        currItems.push({
          currTitle: directory[i],
          newTitle: config?.name,
          currPath: currDir.slice(1),
          items: [],
        });
        // If it doesn't exist and it's a demo, add it
      } else if (currConf.length == 0 && i == directory.length - 1) {
        let config = JSON.parse(
          fs.readFileSync(`${currentRepo}${currDir}/demo-config.json`, 'utf8')
        );
        currItems.push({
          currTitle: directory[i],
          newTitle: config?.metadata?.title,
          currPath: currDir.slice(1),
        });
      }
      // Update the current config marker
      currConf = currItems.filter((conf) => {
        return conf.currTitle == directory[i];
      })[0];
      currItems = currConf?.items;
    }
  });

  // Get just the list of dir configs we care about
  let dirConfigs = allFiles.filter((file) => file.endsWith('/dir-config.json'));

  // Sort routeConfigs in the proper order
  dirConfigs.forEach((file) => {
    // Grab the directory order
    let order = JSON.parse(fs.readFileSync(file, 'utf8'))?.order;

    // Grab the route config to sort
    file = file.replace(currentRepo + '/', '');
    file = file.replace('/dir-config.json', '');
    let dirs = file.split('/');
    let currRouteConf;
    let items = routeConfigs;
    for (let i = 0; i < dirs.length; i++) {
      currRouteConf = items.filter((conf) => {
        return conf.currTitle == dirs[i];
      })[0];
      items = currRouteConf?.items;
    }

    if (order.length != items.length) return;

    // Sort the route config
    let sortedItems = [];
    for (let i = 0; i < order.length; i++) {
      sortedItems.push(
        items.filter((route) => {
          return route.currTitle == order[i];
        })[0]
      );
    }
    currRouteConf.items = sortedItems;
  });

  // Sort root config
  let rootConfigFile = allFiles.filter((file) =>
    file.endsWith('/root-dir-config.json')
  )[0];
  let rootOrder = JSON.parse(fs.readFileSync(rootConfigFile, 'utf8'))?.order;
  // Sort the route config
  let rootSortedItems = [];
  for (let i = 0; i < rootOrder.length; i++) {
    rootSortedItems.push(
      routeConfigs.filter((route) => {
        return route.currTitle == rootOrder[i];
      })[0]
    );
  }
  routeConfigs = rootSortedItems;

  if (req.query.dir) {
    let dirCategory = req.query.dir.split('/')[0];
    // Grab the demos array
    routeConfigs = {
      demos: flattenRouteConfigs(routeConfigs),
    };
    if (req.query.dir != '/') {
      routeConfigs.demos = routeConfigs.demos.filter((route) => {
        if (route.startsWith(req.query.dir)) return route;
      });
      // grab the section name
      let categoryDemo = `${currentRepo}/${dirCategory}/dir-config.json`;
      routeConfigs.name = JSON.parse(
        fs.readFileSync(categoryDemo, { encoding: 'utf8' })
      );
      routeConfigs.name = routeConfigs.name.name;
    }
  }

  // Send back the route config object
  res.json(routeConfigs);
});

/**
 * Returns a list of all of the demos and what files are in each demo
 */
app.get('/:repo/demo-files', (req, res) => {
  // Right now only the examples repo is supported
  if (!supportedRepos.includes(req.params.repo)) {
    res.status(400).send('Repo not supported');
    return;
  }
  // The string path to the current repo we are in
  const repoDir = getCurrentRepo();
  // All of the desired files in our current repo
  let files = recursiveFileSearch(repoDir, exclude);
  files = files.map((file) => {
    return file.replaceAll(repoDir + '/', '');
  });
  // Filter out anything that isn't an demo-config.json path
  let allDemoFiles = files.filter((file) => file.endsWith('/demo-config.json'));
  // Find all of the files for each demo
  allDemoFiles = allDemoFiles.map((demo) => {
    let demoTitle = demo.replaceAll(repoDir + '/', '');
    demoTitle = demoTitle.replaceAll('/demo-config.json', '');
    let demoFiles = files.filter((file) => file.startsWith(demo));
    demoFiles = demoFiles.map((file) => {
      file = file.replaceAll('/demo-config.json', '');
      return file.replace(demoTitle + '/', '');
    });
    return {
      title: demoTitle,
      files: demoFiles,
    };
  });
  // Convert to an easier to use format
  let formattedFiles = {};
  allDemoFiles.forEach((demo) => {
    formattedFiles[demo.title] = demo.files;
  });

  res.json(formattedFiles);
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

/**
 * Takes the route config object and flattens it for use in the sidebar
 * @param {Array<Object>} config the nested route config object in order
 * @returns {Array<String>} the flattened route config object
 */
function flattenRouteConfigs(config) {
  let flattened = [];
  for (let i = 0; i < config.length; i++) {
    // is a directory
    if (config[i].items) {
      flattened = flattened.concat(flattenRouteConfigs(config[i].items));
    }
    // is a demo
    else {
      flattened.push(config[i].currPath);
    }
  }
  return flattened;
}
