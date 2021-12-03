let fiveDifferentStrings = /[^,]+(,[^,]+){4}/;
let test1 = fiveDifferentStrings.test('peter, paul, mary, lary');
let test2 = fiveDifferentStrings.test('larry, curly, moe, shemp, curly joe');
console.log(`"peter, paul, mary, lary" = ${test1}`);
console.log(`"larry, curly, moe, shemp, curly joe" = ${test2}`);