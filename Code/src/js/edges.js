export default [
  { from: "A", to: "B", cond: true, distance: 2 },
  { from: "B", to: "C", cond: true, distance: 3 },
  { from: "A", to: "C", cond: true, distance: 10 },
  { from: "C", to: "D", cond: true, distance: 4 },
  { from: "D", to: "E", cond: true, distance: 5 },
  { from: "E", to: "G", cond: true, distance: 2 },
  { from: "G", to: "H", cond: true, distance: 45 },
  { from: "E", to: "F", cond: true, distance: 34 },
  { from: "H", to: "F", cond: true, distance: 45 },
  { from: "F", to: "J", cond: true, distance: 75 },
  { from: "H", to: "I", cond: true, distance: 25 },
  { from: "J", to: "K", cond: true, distance: 35 },
  { from: "K", to: "L", cond: true, distance: 43 },
  { from: "B", to: "L", cond: true, distance: 34 },
  { from: "L", to: "M", cond: true, distance: 23 },
  { from: "M", to: "N", cond: true, distance: 75 },
  // Add all connections for two-way edges
];
