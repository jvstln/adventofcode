import { readFile } from "fs/promises";
const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

const inputGrid = input.split("\n").map((line) => [...line]);

function getAdjacentString(cord, length, direction) {
  // Direction can be top, topright, right, topleft,  bottom...
  // cord is in form of [x, y] cordinates
  let x = 0,
    y = 0;

  if (direction.startsWith("top")) y--;
  if (direction.startsWith("bottom")) y++;
  if (direction.endsWith("left")) x--;
  if (direction.endsWith("right")) x++;

  let result = "";
  for (let i = 0; i < length; i++) {
    result += inputGrid[cord[1] + y * i]?.[cord[0] + x * i] ?? "";
  }

  return result;
}

function lookForString(string) {
  let stringCount = 0;

  inputGrid.forEach((row, y) => {
    row.forEach((char, x) => {
      if (char == string[0]) {
        [
          "top",
          "topright",
          "right",
          "bottomright",
          "bottom",
          "bottomleft",
          "left",
          "topleft",
        ].forEach((direction) => {
          let adjString = getAdjacentString([x, y], string.length, direction);
          if (adjString == string) stringCount++;
        });
      }
    });
  });

  return stringCount;
}

console.log(lookForString("XMAS")); // Part 1
