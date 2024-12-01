import { readFile } from "fs/promises";
const input = await readFile(`${import.meta.dirname}/input.txt`, "utf8");

const trips = [];
const possibleRoutes = [];

function addTrip(trip) {
  if (trips.length == 0) {
    trips.push(trip);
    return;
  }

  for (let i = 0; i < trips.length; i++) {
    if (trips[i].at(-1) > trip.at(-1)) {
      trips.splice(i, 0, trip);
      return;
    }
  }

  trips.push(trip);
}

function getTrips(location) {
  return trips
    .filter((trip) => trip.includes(location))
    .map((trip) =>
      trip[0] == location
        ? [trip[0], trip[1], trip[2]]
        : [trip[1], trip[0], trip[2]]
    );
}

function parseTrips(input) {
  for (const line of input.split("\n")) {
    const [[l1, l2], distance] = line
      .split(" = ")
      .map((x) => (isNaN(x) ? x.split(" to ") : Number(x)));

    addTrip([l1, l2, distance]);
  }
}

function trace(route = {}) {
  if (!route.path) route.path = [trips[0][0]];
  if (!route.distances) route.distances = [0];

  let possibleTrips = getTrips(route.path.at(-1)).filter(
    (trip) => !route.path.includes(trip[1])
  );

  if (possibleTrips.length == 0) {
    possibleRoutes.push(route);
    return;
  }

  possibleTrips.forEach((trip) =>
    trace({
      path: [...route.path, trip[1]],
      distances: [...route.distances, trip[2]],
    })
  );
}

parseTrips(input);
getTrips(trips[0][0])
  .map((trip) => trip[1])
  .concat(trips[0][0])
  .forEach((location) => trace({ path: [location], distances: [0] }));

let possibleTotalDistances = possibleRoutes.map((route) =>
  route.distances.reduce((sum, d) => sum + d)
);

console.log(Math.min.apply(null, possibleTotalDistances)); // Part 1: distance of the shortest route
console.log(Math.max.apply(null, possibleTotalDistances)); // Part 2: distance of the longest route
