import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

let total = 0;

for (const line of input.split("\n")) {
  const [l, w, h] = line.split("x").map((n) => Number(n));

  let area = 2 * l * w + 2 * w * h + 2 * h * l;
  let extra = Math.min(l * w, l * h, w * h);
  total += area + extra;
}

console.log(total);
