/**
 * filename: build-sidebar.js
 * author: Camdyn Rasque
 * organization: PINT, Inc
 * project: Intro to Web Technology
 * created: Tuesday, April 19th 2022
 * description: Generates the static markup used for the sidebar for each demo
 */

// @ts-nocheck

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

// Includes
const FS = require('fs-extra');
const jsdom = require('jsdom');
const PRETTIER = require('prettier');

// JSDOM Constants
const { JSDOM } = jsdom;
const DOM = new JSDOM(`<!DOCTYPE html><div></div>`);
const DOCUMENT = DOM.window.document;
const CONTENT = DOCUMENT.querySelector('div');

// Paths excluded from searching
const EXCLUDE = ['_repo-apis', '.vscode', '.gitignore', 'README.md'];

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
 * @param {string} dir the directory with which to search for files
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
 * Grabs the category list from the current list of all demos
 * @param {Array<string>} indexFiles absolute path of all index.html files in demos
 * @param {String} examplesDir absolute path of the examples directory
 * @returns {Array<string>} list of all of the demo categories
 */
function getCategories(indexFiles, examplesDir) {
  let categories = new Set();
  indexFiles.forEach((file) => {
    file = file.replace(examplesDir + '/', '');
    categories.add(file.split('/')[0]);
  });
  return Array.from(categories);
}

/**
 * Generates the sidebar markup for each category.
 * Outputs to /{category}/sidebar.hmtml
 * @param {String} category The current category to generate
 * @param {String} examplesDir The absolute path of the examples directory
 * @param {Array<string>} indexFiles A list of all index.html files from demos
 * @param {Number} currDirLength Depth of the examples directory
 */
function generateMarkup(category, examplesDir, indexFiles, currDirLength) {
  let categoryFiles = indexFiles.filter((file) =>
    file.startsWith(`${examplesDir}/${category}`)
  );

  let numDemos = 0;

  categoryFiles.forEach((file) => {
    file = file.replace('/index.html', '');
    let dirs = file.split('/');
    for (let i = currDirLength; i < dirs.length; i++) {
      let path = dirs.slice(0, i + 1).join('/');
      let id = 'sidebar--' + path.replace(examplesDir + '/', '');
      id = id.replaceAll('/', '_');
      let level = i - currDirLength;
      if (level > 4) level = 4;
      let name;

      // It's a directory
      if (FS.existsSync(path + '/dir-config.json')) {
        let dirConfig = FS.readJsonSync(path + '/dir-config.json');
        name = dirConfig.name;
        // It's a top level H2
        if (level == 0 && !DOCUMENT.querySelector(`#${id}`)) {
          let orderedList = DOCUMENT.createElement('ol');
          let title = DOCUMENT.createElement('header');

          title.innerHTML = `<h2 id="hamburger-category">${name}</h2>`;

          CONTENT.setAttribute('id', id);
          CONTENT.append(title, orderedList);
          // It's a lower H level
        } else if (level > 0 && !DOCUMENT.querySelector(`#${id}`)) {
          let idToFind = id.split('_');
          idToFind.pop();
          idToFind = idToFind.join('_');
          let newList = DOCUMENT.querySelector(`#${idToFind} ol`);

          let listItem = DOCUMENT.createElement('li');
          let orderedList = DOCUMENT.createElement('ol');
          let title = DOCUMENT.createElement(`h${2 + level}`);

          listItem.setAttribute('id', id);
          title.innerHTML = name;

          listItem.append(title, orderedList);
          newList.append(listItem);
        }

        // It's a demo
      } else if (
        FS.existsSync(path + '/config.json') &&
        FS.existsSync(path + '/index.html')
      ) {
        numDemos += 1;

        let demoConfig = FS.readJsonSync(path + '/config.json');
        name = demoConfig.metadata.title;

        let idToFind = id.split('_');
        idToFind.pop();
        idToFind = idToFind.join('_');
        let newList = DOCUMENT.querySelector(`#${idToFind} ol`);
        if (!newList.classList.contains('demo-links')) {
          newList.setAttribute('start', numDemos);
        }
        newList.classList.add('demo-links');

        let listItem = DOCUMENT.createElement('li');
        let anchor = DOCUMENT.createElement('a');
        let demoPath = path.replace(examplesDir + '/', '');
        anchor.setAttribute('target', '_top');
        anchor.setAttribute(
          'href',
          `https://introweb.tech/examples/${demoPath}`
        );
        anchor.innerHTML = name;

        listItem.append(anchor);
        newList.append(listItem);
      }
    }
  });

  FS.writeFileSync(
    `${examplesDir}/${category}/sidebar.html`,
    PRETTIER.format(CONTENT.innerHTML, {
      filepath: `${examplesDir}/${category}/sidebar.html`,
    })
  );

  CONTENT.innerHTML = '';
}

/***************************/
/***   3. Main Program   ***/
/***************************/

function init() {
  // Grab the absolute path to the examples dir
  let examplesDir = getExamplesDirectory();
  // Search for every file, excluding these directories
  let allFiles = recursiveFileSearch(examplesDir, EXCLUDE);
  // Limit the files to just the index.html files
  let indexFiles = allFiles.filter((file) => file.endsWith('/index.html'));
  // Grab the categories of those index files
  let categories = getCategories(indexFiles, examplesDir);
  // Grab the length of the current directory, makes things easier when
  // generating markup
  let currDirLength = examplesDir.split('/').length;

  // Create the sidebar markup for each of the categories.
  // Outputs to /{category}/sidebar.html
  categories.forEach((category) => {
    generateMarkup(category, examplesDir, indexFiles, currDirLength);
  });
}

init();
