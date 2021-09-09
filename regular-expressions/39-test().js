var pattern = new RegExp("a*bbbc", "i");  // case-insensitive matching
alert(pattern.test("1a12c"));//displays false
alert(pattern.test("aaabBbcded")); //displays true