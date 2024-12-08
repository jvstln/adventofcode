import { readFile } from "fs/promises";
let input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

input = input.trim().split("\n");

const antennas = {};
const antiNodes = new Set();

input.forEach((line, colIndex) => {
  line.split("").forEach((antenna, rowIndex) => {
    if (antenna === ".") return;

    if (!antennas[antenna]) antennas[antenna] = [];

    antennas[antenna].forEach((pos) => {
      createAntiNode(pos, { x: rowIndex, y: colIndex }, antenna);
    });

    antennas[antenna].push({ x: rowIndex, y: colIndex });
  });
});

function createAntiNode(pos1, pos2) {
  const dx = Math.abs(pos1.x - pos2.x);
  const dy = Math.abs(pos1.y - pos2.y);
  const [minX, maxX] = [pos1.x, pos2.x].sort((a, b) => a - b);
  const [minY, maxY] = [pos1.y, pos2.y].sort((a, b) => a - b);

  const antiNode1 = {
    x: pos1.x == maxX ? pos1.x + dx : pos1.x - dx,
    y: pos1.y == maxY ? pos1.y + dy : pos1.y - dy,
  };
  const antiNode2 = {
    x: pos2.x == maxX ? pos2.x + dx : pos2.x - dx,
    y: pos2.y == maxY ? pos2.y + dy : pos2.y - dy,
  };

  if (isWithinMap(antiNode1)) {
    antiNodes.add(`${antiNode1.x},${antiNode1.y}`);
  }
  if (isWithinMap(antiNode2)) {
    antiNodes.add(`${antiNode2.x},${antiNode2.y}`);
  }
}

function isWithinMap(pos) {
  return (
    pos.x >= 0 && pos.x < input[0].length && pos.y >= 0 && pos.y < input.length
  );
}

console.log(antiNodes.size); // Part 1
