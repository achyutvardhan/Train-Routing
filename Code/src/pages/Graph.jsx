import React, { useState } from "react";
import "../css/Graph.css"; // Assuming Graph.css styles the circles

export default function Graph() {
  const nodes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
  const edges = [
    { from: 'A', to: 'B' },
    { from: 'B', to: 'C' },
    { from: 'C', to: 'D' },
    { from: 'D', to: 'E' },
    { from: 'E', to: 'G' },
    { from: 'G', to: 'H' },
    { from: 'E', to: 'F' },
    { from: 'H', to: 'F' },
    { from: 'F', to: 'J' },
    { from: 'H', to: 'I' },
    { from: 'J', to: 'K' },
    { from: 'K', to: 'L' },
    { from: 'B', to: 'L' },
    { from: 'L', to: 'M' },
    { from: 'M', to: 'N' },
    // Add all connections for two-way edges
    { from: 'B', to: 'A' },
    { from: 'C', to: 'B' },
    { from: 'D', to: 'C' },
    { from: 'G', to: 'E' },
    { from: 'H', to: 'G' },
    { from: 'F', to: 'E' },
    { from: 'F', to: 'H' },
    { from: 'J', to: 'F' },
    { from: 'I', to: 'H' },
    { from: 'K', to: 'J' },
    { from: 'L', to: 'K' },
    { from: 'L', to: 'B' },
    { from: 'M', to: 'L' },
    { from: 'N', to: 'M' },
  ];
  const [selectedNode, setSelectedNode] = useState(null); // Track selected node

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    // Add your logic for handling node selection (e.g., display node information)
  };

  const handleEdgeClick = (edge) => {
    // Add your logic for handling edge selection (e.g., highlight connected nodes)
    console.log(`Edge clicked: ${edge.from} to ${edge.to}`);
  };

  const getNodePosition = (node) => {
    // Implement logic to calculate node positions based on your layout (circular, hierarchical, etc.)
    // This is a simplified example assuming a circular layout with a fixed radius
    const radius = 200;
    const angle = (nodes.indexOf(node) / nodes.length) * 2 * Math.PI;
    return {
      x: Math.cos(angle) * radius + 150, // Adjust center coordinates as needed
      y: Math.sin(angle) * radius + 150,
    };
  };

  return (
    <>
      <div className="graph-container">
        <svg className="graph" viewBox="0 0 600 500">
          {/* Render nodes */}
          {nodes.map((node) => (
            <circle
              key={node}
              className={`node ${selectedNode === node ? "selected" : ""}`} // Add selected class
              cx={getNodePosition(node).x}
              cy={getNodePosition(node).y}
              r="30"
              onClick={() => handleNodeClick(node)}
            >
              {/* Display node text */}
              <text
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="20" // Adjust font size as needed
              >
                {node}
              </text>
            </circle>
          ))}

          {/* Render edges */}
          {edges.map((edge) => (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={getNodePosition(edge.from).x}
              y1={getNodePosition(edge.from).y}
              x2={getNodePosition(edge.to).x}
              y2={getNodePosition(edge.to).y}
              className="edge"
              onClick={() => handleEdgeClick(edge)}
            />
          ))}
        </svg>
      </div>
    </>
  );
}