/**
 * filename: build-metadata.js
 * author: Camdyn Rasque
 * organization: PINT, Inc
 * project: Intro to Web Technology
 * created: Tuesday, April 19th 2022
 * description: Builds out the main category config files from each individual
 *              demo's config files
 */

/*************************/
/*                       */
/*  Table of Contents:   */
/*  -------------------  */
/*                       */
/*  1. Constants         */
/*  2. Helper Functions  */
/*  3. Main Program      */
/*                       */
/*************************/

/*************************/
/***   1. Constants    ***/
/*************************/

const FS = require('fs-extra');
const EXCLUDE = ['_repo-apis', '.vscode', '.gitignore', 'README.md', 'temp.js'];
const PRETTIER = require('prettier');

/***************************/
/*** 2. Helper Functions ***/
/***************************/

/**
 * Finds and returns the absolute path to the examples directory, should be one
 * level above where this script is executed
 * @returns {string} The absolute path to the examples directory
 */
function getExamplesDirectory() {
  let currDir = __dirname.split('/');
  currDir.pop();
  return currDir.join('/');
}

/**
 *
 * @param {String} dir the directory with which to search for files
 * @param {Array<string>} exclude A list of files / directories to exclude in
 *                                file search
 * @returns {Array<string>} an array of all of the paths of the found files
 */
function recursiveFileSearch(dir, exclude) {
  let entitiesInDir, dirsInDir, filesInDir;
  // Get everything in the directory first
  entitiesInDir = FS.readdirSync(dir);
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
    if (FS.lstatSync(`${dir}/${entity}`).isDirectory()) return true;
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
 * Grab all of the proper titles from the config files of each demo
 * @param {Array<string>} allFiles A list of absolute paths of every file in each demo
 * @returns {Object} A key value pair of each relative path to a demo and
 *                   it's corresponding proper title
 */
function getDemoTitles(allFiles, examplesDir) {
  // Find the config.json files for each demo
  let configs = allFiles.filter((file) => file.endsWith('index.html'));
  configs = configs.map((file) => file.replace('/index.html', '/demo-config.json'));
  // Create a key value pair of the actual title with it's relative path
  let titles = {};
  configs.forEach((config) => {
    let configData = JSON.parse(FS.readFileSync(config, { encoding: 'utf8' }));
    let demoPath = config.replace(examplesDir + '/', '');
    demoPath = demoPath.replace('/demo-config.json', '');
    titles[demoPath] = configData.metadata.title;
  });
  return titles;
}

/***************************/
/***   3. Main Program   ***/
/***************************/

function init() {
  // Grab the absolute path to the examples dir
  let examplesDir = getExamplesDirectory();
  // Search for every file, excluding these directories
  let allFiles = recursiveFileSearch(examplesDir, EXCLUDE);
  // Grabs the proper demo titles from the configs in each demo
  let demoTitles = getDemoTitles(allFiles, examplesDir);
  // Create a file these categories
  FS.writeFileSync(
    examplesDir + '/examples.json',
    PRETTIER.format(JSON.stringify(demoTitles), { filepath: './examples.json' })
  );
}

init();
