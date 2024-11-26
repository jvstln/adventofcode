import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

const visitedHouses = new Set(["0,0"]);
let lastHouse = [0, 0];

for (const char of input) {
  switch (char) {
    case "^":
      lastHouse[1]++;
      break;
    case ">":
      lastHouse[0]++;
      break;
    case "v":
      lastHouse[1]--;
      break;
    case "<":
      lastHouse[0]--;
      break;
  }

  visitedHouses.add(lastHouse.join(","));
}

console.log(visitedHouses.size);
