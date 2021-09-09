/ab+c/.test('abc');  // true
/ab+c/.test('ac'); // false - required at least 1 b
/ab+c/.test('abbbbbc'); // true 
/ab+c/.test('The letters abc begin the alphabet');