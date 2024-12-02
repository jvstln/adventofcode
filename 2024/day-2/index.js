import { readFile } from "fs/promises";
const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

function isSafe(report) {
  let prevDiff = 0;
  let reportLevels = report.split(" ");

  for (let i = 1; i < reportLevels.length; i++) {
    const diff = reportLevels[i] - reportLevels[i - 1];
    if (diff == 0 || prevDiff * diff < 0 || Math.abs(diff) > 3) {
      return false;
    }

    prevDiff = diff;
  }

  return true;
}

let safeCount = 0;
for (const report of input.split("\n")) {
  if (isSafe(report)) {
    safeCount++;
    continue;
  }

  // Else dampen the problem
  const isDampenedSafe = report
    .split(" ")
    .map((_, index, arr) =>
      arr
        .slice(0, index)
        .concat(arr.slice(index + 1))
        .join(" ")
    )
    .some((dampenedReport) => isSafe(dampenedReport));

  if (isDampenedSafe) safeCount++;
}

console.log(safeCount);
