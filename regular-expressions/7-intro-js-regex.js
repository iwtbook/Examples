let regexName = new RegExp(pattern, modifiers);

console.log(myMatcher.test('https://example.org')); // true
console.log(myMatcher.test('example.org')); // false
console.log(myMatcher.test('some stuff https  other stuff')); // true
console.log(myMatcher.test('HTTPS')); // false