import { readFile } from "fs/promises";
const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

const inputGrid = input.split("\n").map((line) => [...line]);

function getXAdjacentString(cord, offset, direction) {
  // Direction can be top, topright, right, topleft,  bottom...
  // cord is in form of [x, y] cordinates
  let x = 0,
    y = 0;

  if (direction.startsWith("top")) y--;
  if (direction.startsWith("bottom")) y++;
  if (direction.endsWith("left")) x--;
  if (direction.endsWith("right")) x++;

  let result = [inputGrid[cord[1]]?.[cord[0]] ?? ""];
  for (let i = 1; i <= offset; i++) {
    result.unshift(inputGrid[cord[1] + y * i]?.[cord[0] + x * i] ?? "");
    result.push(inputGrid[cord[1] + y * -i]?.[cord[0] + x * -i] ?? "");
  }

  return result.join("");
}

function lookForString(string) {
  let stringCount = 0;

  inputGrid.forEach((row, y) => {
    row.forEach((char, x) => {
      if (char == string[(string.length - 1) / 2]) {
        let args = [[x, y], (string.length - 1) / 2];
        let diagonal1 = getXAdjacentString(...args, "topright");
        let diagonal2 = getXAdjacentString(...args, "topleft");

        let isDiagonalEqual =
          diagonal1 == diagonal2 ||
          diagonal1 == [...diagonal2].reverse().join("");
        let isDiagonalSearchString =
          diagonal1 == string || [...diagonal1].reverse().join("") == string;

        if (isDiagonalEqual && isDiagonalSearchString) {
          stringCount++;
        }
      }
    });
  });

  return stringCount;
}

console.log(lookForString("MAS")); // Part 2
// For part 1, checkout the previous git commit
