const isPhoneNumber = (val) => (/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(val));

console.log(`123456 is a phone number: ${isPhoneNumber('123456')}`);
console.log(`12-18-2008 is a phone number: ${isPhoneNumber('12-18-2008')}`);
console.log(`619-555-1212 is a phone number: ${isPhoneNumber('619-555-1212')}`);