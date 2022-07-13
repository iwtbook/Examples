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
const FETCH = require('node-fetch');

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
 * Grabs the category list from the current list of all demos
 * @param {Array<string>} demoList relative path of all demos
 * @returns {Array<string>} list of all of the demo categories
 */
function getCategories(demoList) {
	let categories = new Set();
	demoList.forEach((demo) => {
		categories.add(demo.split('/')[0]);
	});
	return Array.from(categories);
}

/**
 * Generates the sidebar markup for each category.
 * Outputs to /{category}/sidebar.hmtml
 * @param {String} category The current category to generate
 * @param {String} examplesDir The absolute path of the examples directory
 * @param {Array<String>} demoList A list of all demos
 * @param {Number} currDirLength Depth of the examples directory
 */
function generateMarkup(category, examplesDir, demoList, currDirLength) {
	let categoryDemos = demoList.filter((demo) => {
		return demo.startsWith(category);
	});
	categoryDemos = categoryDemos.map((demo) => {
		return `${examplesDir}/${demo}`;
	});

	let numDemos = 0;

	categoryDemos.forEach((demo) => {
		let dirs = demo.split('/');
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
			} else if (FS.existsSync(path + '/demo-config.json')) {
				numDemos += 1;

				let demoConfig = FS.readJsonSync(path + '/demo-config.json');
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
				anchor.setAttribute('href', `https://introweb.tech/learn#${demoPath}`);
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

async function init() {
	// Grab the absolute path to the examples dir
	let examplesDir = getExamplesDirectory();
	// Fetch all of the demos from /route-configs
	let demosList = await FETCH(
		'http://localhost:3001/examples/route-configs?dir=/'
	);
	demosList = await demosList.json();
	demosList = demosList.demos;
	// Grab the categories of those index files
	let categories = getCategories(demosList);
	// Grab the length of the current directory, makes things easier when
	// generating markup
	let currDirLength = examplesDir.split('/').length;

	// Create the sidebar markup for each of the categories.
	// Outputs to /{category}/sidebar.html
	categories.forEach((category) => {
		generateMarkup(category, examplesDir, demosList, currDirLength);
	});
}

init();
