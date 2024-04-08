class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(node) {
        this.nodes.set(node, []);
    }

    addEdge(source, destination, weight) {
        this.nodes.get(source).push({ node: destination, weight: weight });
        this.nodes.get(destination).push({ node: source, weight: weight }); // If the graph is undirected
    }

    dijkstra(start, end) {
        const visited = new Set();
        const distances = new Map();
        const previous = new Map();
        const priorityQueue = new PriorityQueue();

        for (const node of this.nodes.keys()) {
            distances.set(node, Infinity);
            previous.set(node, null);
        }

        distances.set(start, 0);
        priorityQueue.enqueue(start, 0);

        while (!priorityQueue.isEmpty()) {
            const currentNode = priorityQueue.dequeue();

            if (currentNode === end) {
                const path = [];
                let current = end;
                while (current !== null) {
                    path.unshift(current);
                    current = previous.get(current);
                }
                return path;
            }

            if (!visited.has(currentNode)) {
                visited.add(currentNode);
                const neighbors = this.nodes.get(currentNode);
                for (const neighbor of neighbors) {
                    const { node, weight } = neighbor;
                    const totalDistance = distances.get(currentNode) + weight;
                    if (totalDistance < distances.get(node)) {
                        distances.set(node, totalDistance);
                        previous.set(node, currentNode);
                        priorityQueue.enqueue(node, totalDistance);
                    }
                }
            }
        }

        return null; // No path found
    }
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(node, priority) {
        this.queue.push({ node, priority });
        this.sort();
    }

    dequeue() {
        return this.queue.shift().node;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }
}

// Define the edges
const edges = [
    { from: "A", to: "B", cond: true, distance: 2 },
    { from: "B", to: "C", cond: true, distance: 3 },
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
    { from: "M", to: "N", cond: true, distance: 75 }
];

// Create the graph
const graph = new Graph();

// Add nodes to the graph
const nodes = new Set();
edges.forEach(edge => {
    nodes.add(edge.from);
    nodes.add(edge.to);
});
nodes.forEach(node => graph.addNode(node));

// Add edges to the graph
edges.forEach(edge => graph.addEdge(edge.from, edge.to, edge.distance));

// Find shortest path
const shortestPath = graph.dijkstra("A", "N");

// Export the shortest path
// exports = shortestPath;
