const isPhoneNumber = (val) => (/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(val));

const result = isPhoneNumber('839-213-455-726-0078');
console.log(`839-213-455-726-0078 is a phone number: ${result}`);
// ^ shows true which it shouldn't