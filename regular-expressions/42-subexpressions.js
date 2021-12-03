var customer = "Alan Turing 555-1212";
var pattern = /(\w+) \w+ ([\d-]{8})/;
if (pattern.test(customer)) {
  alert("RegExp.$1 = " + RegExp.$1 + "\nRegExp.$2 = " + RegExp.$2);
}