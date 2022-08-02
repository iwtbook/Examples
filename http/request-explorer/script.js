// request-explorer.js

const url = 'https://httplayground.introweb.tech/post';

// Does not initialize the function until the DOM Content has loaded
window.addEventListener('DOMContentLoaded', init);

/**
 * Initializing function, the program starts here
 */
function init() {
	const ratingForm = document.querySelector('form[name="ratingForm"]');
	ratingForm.addEventListener('submit', (e) => {
		// Stops the page from refreshing on form submit
		e.preventDefault();
		// Grab the rating, comment, and content-type from the form
		const rating = ratingForm.elements.rating.value;
		const comment = ratingForm.elements.comment.value;
		const contentType = ratingForm.elements.contentType.value;
		// Sends the rating to the server and displays response
		rate(rating, comment, contentType);
	});
}

/**
 * Encodes the given rating submission content, and then submits the
 * information to the server. Once that has been submitted, displays the
 * response.
 * @param {string} rating The user's rating, a value from 1-5
 * @param {string} comment The user's comment, a block of text
 * @param {string} contentType The content-type to send the data as
 */
function rate(rating, comment, contentType) {
	// Encode the rating and the comment so they are URL safe
	rating = encodeVal(rating);
	comment = encodeVal(comment);
	// Prepare the payload as the specified content type
	let payload = '';
	switch (contentType) {
		case 'text/xml':
			payload = `
        <?xml version="1.0" encoding="UTF-8"?>
        <vote>
          <rating>${rating}</rating>
          <comment>${comment}</comment>
        </vote>
      `;
			break;
		case 'application/json':
			payload = JSON.stringify({ rating: rating, comment: comment });
			break;
		case 'text/x-yaml':
			let payloadYaml = new YAML();
			payload = payloadYaml.dump([{ rating: rating, comment: comment }]);
			break;
		case 'base64':
			payload = btoa(`rating=${rating},comment=${comment}`);
			break;
		case 'text/plain':
			payload = `rating=${rating},comment=${comment.replaceAll(',', '%2C')}`;
			break;
		default:
			// The default is the same as x-www-form-urlencoded here
			payload = `rating=${rating}&comment=${comment}`;
			break;
	}
	// Send the request to the server and display the response
	sendRequest(payload, contentType);
}

/**
 * encodeURIComponent isn't perfect, so additional characters are encoded along
 * with its output. Makes the given string safe for use in URIs / URLs
 * @param {string} val the value to encode
 * @returns an encoded value
 */
function encodeVal(val) {
	val = encodeURIComponent(val);
	val = val.replaceAll('!', '%21');
	val = val.replaceAll('(', '%28');
	val = val.replaceAll(')', '%29');
	val = val.replaceAll("'", '%27');
	val = val.replaceAll('%22', '"');
	return val;
}

/**
 * Sends the request to the sever with a POST request, displays the response on
 * the page
 * @param {string} payload the encoded & prepared payload to send to the server
 * @param {string} contentType the content type to use when sending this payload
 */
function sendRequest(payload, contentType) {
	// Headers for the POST request to use
	const headers = {
		'Content-Type': contentType,
	};

	if (contentType == 'base64') {
		headers['Content-Type'] = 'text/plain';
		headers['Content-Transfer-Encoding'] = 'base64';
	}

	fetch(url, {
		method: 'POST',
		headers: headers,
		body: payload,
	})
		.then((response) => response.json())
		.then((data) => {
			document.querySelector('output').innerHTML = JSON.stringify(data, null 2);
		})
		.catch((err) => {
			console.error(err);
		});
}
