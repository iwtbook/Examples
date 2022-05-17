// temp.js

/*************************/
/***   1. Constants    ***/
/*************************/

// Imports
const FS = require('fs-extra');

// Paths excluded from searching
const EXCLUDE = ['_repo-apis', '.vscode', '.gitignore', 'README.md'];

/***************************/
/*** 2. Helper Functions ***/
/***************************/

function getExamplesDirectory() {
  let currDir = __dirname.split('/');
  currDir.pop();
  return currDir.join('/');
}

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

/***************************/
/***   3. Main Program   ***/
/***************************/

function init() {
  let currDir = getExamplesDirectory();
  let files = recursiveFileSearch(currDir, []);
  let demos = files.filter((file) => file.endsWith('/index.html'));
  demos = demos.map((file) => file.replace('/index.html', ''));
  demos.forEach((demo) => {
    if (!FS.pathExistsSync(`${demo}/learn.md`)) {
      FS.outputFileSync(`${demo}/learn.md`, '# Temp Title\n');
    }
    if (!FS.pathExistsSync(`${demo}/quiz.md`)) {
      FS.outputFileSync(`${demo}/quiz.md`, '# Quiz Yourself\n');
    }
    if (!FS.pathExistsSync(`${demo}/resources.md`)) {
      FS.outputFileSync(`${demo}/resources.md`, '# Resources\n');
    }
  });
}

init();
