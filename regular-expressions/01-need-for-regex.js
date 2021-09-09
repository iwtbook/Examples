// Returns true if character is a digit 
const isDigit = (character) => (character >= 0 && character <= 9);

// Returns true if phone is explicitly of the form NNN-NNN-NNNN 
function isPhoneNumber(num) {
  if (num.length != 12)
    return false;

  // For each character in the string... 
  for (let i = 0; i <= 12; i++) {
    // If there should be a dash here... 
    if (i == 3 || i == 7) {
      // Return false if there's not 
      if (num.charAt(i) != "-")
        return false;
    }    // Else there should be a digit here... 
    else { // Return false if there's not 
      if (!isDigit(num.charAt(i)))
        return false;
    }
  }
  return true;
}