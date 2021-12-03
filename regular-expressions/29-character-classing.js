const allowedUserName = (val) => (/^[a-z][a-z0-9_-]*/i.test(val));
console.log(`x is ${allowedUserNames('x')}`);  // true
console.log(`m-80 is ${allowedUserNames('m-80')}`); // true
console.log(`80-m is ${allowedUserNames('80-m')}`); // false
console.log(`abracadabra is ${allowedUserNames('abracadabra')}`);  // true
console.log(`abra_cad_abra is ${allowedUserNames('abra_cad_abra')}`);  // true
console.log(`_jeff is ${allowedUserNames('_jeff')}`);  // false