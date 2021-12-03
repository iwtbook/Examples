// Direct with the literal, but maybe less 'readable'
/https/i.test('httPs');  // true

// Using readable names and variables to promote reuse and readability
let isSecureURL = /https/i;
isSecureURL.test('https://example.org'); // true