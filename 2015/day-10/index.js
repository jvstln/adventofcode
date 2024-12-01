let input = 1113222113;

function playLookAndSay(input, playCount) {
  for (let i = 0; i < playCount; i++) {
    input = input
      .toString()
      .split("")
      .reduce((acc, char) => {
        if (acc[acc.length - 1]?.[0] == char) acc[acc.length - 1] += char;
        else acc.push(char);
        return acc;
      }, [])
      .map((seq) => `${seq.length}${seq[0]}`)
      .join("");
  }

  return input;
}

console.log(playLookAndSay(input, 40).length); // Part 1
console.log(playLookAndSay(input, 50).length); // Part 2
