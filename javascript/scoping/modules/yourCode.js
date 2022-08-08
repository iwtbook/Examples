// myLib.js

import { foo } from './someLib.js';

console.log(foo); // logs out 'bar' since we imported it

let biz = 'abc'; // No name collision!
let test = 'xyz'; // No name collision since we didn't import!
