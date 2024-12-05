let input = "cqjxjnds";

function nextSequence(input) {
  const alphabet = "abcdefghijklmnoprstuvwxyz";
  if (input.at(-1) == "z") return nextSequence(input.slice(0, -1)) + "a";
  return input.slice(0, -1) + alphabet[alphabet.indexOf(input.at(-1)) + 1];
}

function validatePassword(password) {
  let hasThreeLetterSequence = [...password].some(
    (c, i, arr) =>
      arr[i + 1] == nextSequence(c) && arr[i + 2] == nextSequence(arr[i + 1])
  );

  if (
    /[iol]/.test(password) || // Contains at least one i, o, or l
    (password.match(/(.)\1/g) ?? []).length < 2 || // Contains at least two adjacent matching characters
    !hasThreeLetterSequence // Does NOT contain at least three letters in a row
  ) {
    return false;
  }

  return true;
}

while (!validatePassword(input)) {
  input = nextSequence(input);
}

console.log(input); // Part One

input = nextSequence(input);
while (!validatePassword(input)) {
  input = nextSequence(input);
}

console.log(input); // Part Two
