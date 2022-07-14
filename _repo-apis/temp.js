const fs = require('fs');

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

let files = recursiveFileSearch('..', []);
files = files.filter((file) => file.endsWith('asset-config.json'));
files.forEach((file) => {
	file = file.replace('/asset-config.json', '');
	let newPath = file.replace('/asset`', '/assets');
	fs.rename(file, newPath, () => {
		console.log('finished!');
	});
});
