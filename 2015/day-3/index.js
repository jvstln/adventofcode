import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

const visitedHouses = new Set(["0,0"]);
let SantaLastHouse = [0, 0];
let RoboSantaLastHouse = [0, 0];

for (let i = 0; i < input.length; i++) {
  const lastHouse = i % 2 ? RoboSantaLastHouse : SantaLastHouse;
  const char = input[i];

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
