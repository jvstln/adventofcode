let input = 1113222113;

for (let i = 0; i < 40; i++) {
  input = input
    .toString()
    .replace(/(\d)(\1*)/g, "$1$2 ")
    .trim()
    .split(" ")
    .map((seq) => `${seq.length}${seq[0]}`)
    .join("");
}

console.log(input.length);
