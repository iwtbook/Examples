// temp-build.js

const FS = require('fs-extra');
const jsdom = require('jsdom');
const PRETTIER = require('prettier');
const { JSDOM } = jsdom;
const EXCLUDE = ['_repo-apis', '.vscode', '.gitignore', 'README.md', 'temp.js'];

const DOM = new JSDOM(`<!DOCTYPE html><div id="wrapper"><ol></ol></div>`);
const DOCUMENT = DOM.window.document;
const WRAPPER = DOCUMENT.querySelector('#wrapper');
const LIST = DOCUMENT.querySelector('#wrapper>ol');

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
 * @param {array<string>} exclude A list of files / directories to exclude in
 *                                file search
 * @returns {array<string>} an array of all of the paths of the found files
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

function init() {
  // Grab the absolute path to the examples dir
  let examplesDir = getExamplesDirectory();
  // Search for every file, excluding these directories
  let allFiles = recursiveFileSearch(examplesDir, EXCLUDE);
  let indexFiles = allFiles.filter((file) => file.endsWith('/index.html'));
  let currDirLength = examplesDir.split('/').length;

  indexFiles.forEach((file) => {
    file = file.replace('/index.html', '');
    let dirs = file.split('/');
    for (let i = currDirLength; i < dirs.length; i++) {
      let path = dirs.slice(0, i + 1).join('/');
      let id = 'sidebar--' + path.replace(examplesDir + '/', '');
      id = id.replaceAll('/', '_');
      let level = i - currDirLength;
      if (level > 3) level = 3;
      let name;

      // It's a directory
      if (FS.existsSync(path + '/dir-config.json')) {
        let dirConfig = FS.readJsonSync(path + '/dir-config.json');
        name = dirConfig.name;
        // It's a top level H3
        if (level == 0 && !DOCUMENT.querySelector(`#${id}`)) {
          let listItem = DOCUMENT.createElement('li');
          let orderedList = DOCUMENT.createElement('ol');
          let title = DOCUMENT.createElement('h3');

          listItem.setAttribute('id', id);
          title.innerHTML = name;

          listItem.append(title, orderedList);
          LIST.append(listItem);
          // It's a lower H level
        } else if (level > 0 && !DOCUMENT.querySelector(`#${id}`)) {
          let idToFind = id.split('_');
          idToFind.pop();
          idToFind = idToFind.join('_');
          let newList = DOCUMENT.querySelector(`#${idToFind} ol`);

          let listItem = DOCUMENT.createElement('li');
          let orderedList = DOCUMENT.createElement('ol');
          let title = DOCUMENT.createElement(`h${3 + level}`);

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
        let demoConfig = FS.readJsonSync(path + '/config.json');
        name = demoConfig.metadata.title;

        let idToFind = id.split('_');
        idToFind.pop();
        idToFind = idToFind.join('_');
        let newList = DOCUMENT.querySelector(`#${idToFind} ol`);
        newList.classList.add('demo-links');

        let listItem = DOCUMENT.createElement('li');
        let anchor = DOCUMENT.createElement('a');
        let demoPath = path.replace(examplesDir + '/', '');
        anchor.setAttribute(
          'href',
          `https://examples.introweb.tech/learn?demo=${demoPath}`
        );
        anchor.innerHTML = name;

        listItem.append(anchor);
        newList.append(listItem);
      }
    }
  });

  FS.writeFileSync(
    examplesDir + '/examples.html',
    PRETTIER.format(WRAPPER.innerHTML, {
      filepath: examplesDir + '/examples.html',
    })
  );
}

init();
