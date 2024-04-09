export function floydWarshall(graph, V) {
  const nV = V.length;
  const matrix = Array(nV).fill([]);
  for (let i = 0; i < nV; i++) {
    matrix[i] = Array(nV).fill(Infinity);
  }

  const next = Array(nV).fill([]);
  for (let i = 0; i < nV; i++) {
    next[i] = Array(nV).fill(Infinity);
  }

  graph.forEach((e) => {
    matrix[e.from][e.to] = e.distance;
    next[e.from][e.to] = e.to;
  });

  for (let k = 0; k < nV; k++) {
    for (let i = 0; i < nV; i++) {
      for (let j = 0; j < nV; j++) {
        if (matrix[i][k] == Infinity || matrix[k][j] == Infinity) continue;
        if (matrix[i][j] > matrix[i][k] + matrix[k][j]) {
          matrix[i][j] = matrix[i][k] + matrix[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }
  return [matrix, next];
}

export function shortestpath(next, start, end) {
  var dist = next[start][end];
  if (dist == Infinity) {
    return [];
  }
  var path = [start];
  while (start != end) {
    start = next[start][end];
    path.push(start);
  }
  return path;
}
