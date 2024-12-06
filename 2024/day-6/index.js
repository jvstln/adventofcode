import { readFile } from "fs/promises";
let input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

input = input.trim().split("\n");
let guardPos = { y: input.findIndex((line) => line.includes("^")) };
guardPos.x = input[guardPos.y].indexOf("^");

let direction = { x: 0, y: -1 };
let visitedPositions = new Set();

function move() {
  let isNextOccupied =
    input[guardPos.y + direction.y][guardPos.x + direction.x] == "#";

  if (isNextOccupied) {
    if (direction.x == 1) direction = { x: 0, y: 1 };
    else if (direction.x == -1) direction = { x: 0, y: -1 };
    else if (direction.y == 1) direction = { x: -1, y: 0 };
    else if (direction.y == -1) direction = { x: 1, y: 0 };
  }

  guardPos.x += direction.x;
  guardPos.y += direction.y;
  visitedPositions.add(`${guardPos.x},${guardPos.y}`);
}

while (true) {
  move();

  let isOut =
    guardPos.x >= input[0].length - 1 ||
    guardPos.y >= input.length - 1 ||
    guardPos.x < 0 ||
    guardPos.y < 0;

  if (isOut) {
    break;
  }
}

console.log(visitedPositions.size); // Part 1
