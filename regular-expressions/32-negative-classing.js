let fiveDifferentStrings = /[^,]+(,[^,]+){4}/;
console.log(`"peter, paul, mary, lary" = ${fiveDifferentStrings.test("peter, paul, mary, lary")}`);
console.log(`"larry, curly, moe, shemp, curly joe" = ${fiveDifferentStrings.test("larry, curly, moe, shemp, curly joe")}`);