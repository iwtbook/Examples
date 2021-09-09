let pattern = /abc..d/;
console.log(pattern.test(“abcx7d”));  // true
console.log(pattern.test(“abc_$d”));  // true
console.log(pattern.test(“abc_$_d”));  // false - too many characters