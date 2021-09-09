function isPhoneNumber(num) {
  const pattern = /^\d{3}-\d{3}-\d{4}$/;

  return pattern.test(num);
}