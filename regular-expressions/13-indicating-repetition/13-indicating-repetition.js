/ab*c/.test('ac');  // true
/ab*c/.test('abc'); // true
/ab*c/.test('abbbc');  // true - we can repeat the b
/ab*c/.test('bc'); // false - missing the a
/ab*c/.test('The letters abc are found at the start of the alphabet');
// ^ true - remember we are not showing position here