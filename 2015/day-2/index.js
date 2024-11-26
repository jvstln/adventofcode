import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

let total = 0;
let totalRibbon = 0;

for (const line of input.split("\n")) {
  const [l, w, h] = line.split("x").map((n) => Number(n));

  let area = 2 * l * w + 2 * w * h + 2 * h * l;
  let extra = Math.min(l * w, l * h, w * h);

  let wrapRibbon = Math.min(2 * (l + w), 2 * (l + h), 2 * (w + h));
  let bowRibbon = l * w * h;

  total += area + extra;
  totalRibbon += wrapRibbon + bowRibbon;
}

console.log(total);
console.log(totalRibbon);
