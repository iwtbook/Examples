let myMatcherIgnoreCase = /https/i;

// Also possible to use object syntax
// let myMatcherIgnoreCase = new RegExp('https','i');

console.log(myMatcherIgnoreCase.test('HTTPS'));  //true
console.log(myMatcherIgnoreCase.test('hTtPS'));  //true
console.log(myMatcherIgnoreCase.test('https'));  //true