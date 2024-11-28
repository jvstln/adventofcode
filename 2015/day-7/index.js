import { readFile } from "fs/promises";

let input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");
input = new Set(input.split("\n"));

const signals = {};
const operators = {
  AND: (a, b) => a & b & 0xffff,
  OR: (a, b) => a | (b & 0xffff),
  LSHIFT: (a, b) => (a << b) & 0xffff,
  RSHIFT: (a, b) => (a >> b) & 0xffff,
  NOT: (a) => ~a & 0xffff,
  ASSIGN: (a) => Number(a),
};

function getTokens(equation) {
  // Equation is in the form of: "a AND b -> output". where AND = op
  const [expression, output] = equation.split(" -> ");
  let [a, op, b] = expression.split(" ");

  if (a == "NOT") (a = b = op), (op = "NOT");
  if (!op) (b = a), (op = "ASSIGN");

  return { output, op, a, b };
}

function connectWire(equation) {
  const { output, op, a, b } = getTokens(equation);

  let computedA = isNaN(a) ? signals[a] : Number(a);
  let computedB = isNaN(b) ? signals[b] : Number(b);

  if (computedA == undefined || computedB == undefined) return;

  signals[output] = operators[op](computedA, computedB);
  input.delete(equation);
  resolveDependency(output);
}

function resolveDependency(output) {
  input.forEach((equation) => {
    const { a, b } = getTokens(equation);
    if (a == output || b == output) connectWire(equation);
  });
}

input.forEach((eq) => connectWire(eq));
console.log(signals.a);
