import React, { useState } from "react";
import "../css/Graph.css"; // Assuming Graph.css styles the circles
import edges from "../edges";
import nodes from "../nodes";
import Dropdown from "../components/Dropdown";
import Sidepanel from "../components/Sidepanel";
import SourceDest from "../components/SourceDest";
export default function Graph() {
  const [selectedNode, setSelectedNode] = useState(null); // Track selected node
  const [isOpen, setIsOpen] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
    K: false,
    L: false,
    M: false,
    N: false,
  });
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const handleNodeClick = (node) => {
    setSelectedNode(node);
    console.log(node);
    setIsOpen({ ...isOpen, [node]: !isOpen[node] });
    console.log(isOpen[node]);
  };

  const handleOpen = (val) => {
    setIsOpen(val);
  };
  const handleEdgeClick = (edge) => {
    // Add your logic for handling edge selection (e.g., highlight connected nodes)
    console.log(`Edge clicked: ${edge.from} to ${edge.to}`);
  };

  const getNodePosition = (node) => {
    const radius = 200;
    const angle = (nodes.indexOf(node) / nodes.length) * 2 * Math.PI;
    return {
      x: Math.cos(angle) * radius + 250,
      y: Math.sin(angle) * radius + 150,
    };
  };

  return (
    <>
      <div className="graph-container">
        <svg className="graph" viewBox="0 0 600 500">
          {/* Render nodes */}
          {nodes.map((node) => (
            <>
              <circle
                key={node}
                className={`node ${selectedNode === node ? "selected" : ""}`} // Add selected class
                cx={getNodePosition(node).x}
                cy={getNodePosition(node).y}
                r="30"
                color="white"
                onClick={() => handleNodeClick(node)}
              >
                {node}
              </circle>
            </>
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
         <button onClick={()=>{setIsSidePanelOpen(!isSidePanelOpen)}}>
          {isSidePanelOpen ? "Close Side Panel" : "Open Side Panel"}
        </button>
        <Sidepanel isOpen={isSidePanelOpen} className={isSidePanelOpen ? "open" : ""} /> 

        <SourceDest/>
      </div>
    </>
  );
}
