import React, { useEffect, useState } from "react";
import "../css/Graph.css"; // Assuming Graph.css styles the circles
import edges from "../js/edges";
import nodes from "../js/nodes";
import Sidepanel from "../components/Sidepanel";
import SourceDest from "../components/SourceDest";
export default function Graph() {
  let count = 0;
  const [selectedNode, setSelectedNode] = useState(null); // Track selected node
  const [selectedEdges, setSelectedEdges] = useState(null); // Track selected node
  const [RoutedEdges, setRoutedEdges] = useState(null); // Track Routed node
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [wreckage, setWreckage] = useState([
    { from: "A", to: "B", cond: true },
    { from: "B", to: "C", cond: true },
    { from: "C", to: "D", cond: true },
    { from: "D", to: "E", cond: true },
    { from: "E", to: "G", cond: true },
    { from: "G", to: "H", cond: true },
    { from: "E", to: "F", cond: true },
    { from: "H", to: "F", cond: true },
    { from: "F", to: "J", cond: true },
    { from: "H", to: "I", cond: true },
    { from: "J", to: "K", cond: true },
    { from: "K", to: "L", cond: true },
    { from: "B", to: "L", cond: true },
    { from: "L", to: "M", cond: true },
    { from: "M", to: "N", cond: true },
  ]);
  const handleNodeClick = (node) => {
    const routedEdges = [];
    setSelectedNode(node);
    console.log(node);
    for (let i = 1; i < node.length; i++) {
      routedEdges.push({ from: node[i - 1], to: node[i] });
    }
    setRoutedEdges(routedEdges);
  };
  // console.log(RoutedEdges);
  const handleEdgeClick = (edge) => {
    setSelectedEdges({
      ...selectedEdges,
      [edge.from]: { to: edge.to, count: "" },
    });
    const updatedWreckage = [...wreckage];
    updatedWreckage.forEach((wreckageItem) => {
      if (wreckageItem.from === edge.from && wreckageItem.to === edge.to) {
        wreckageItem.cond = !wreckageItem.cond;
      }
    });
    setWreckage(updatedWreckage);
    // console.table(wreckage);

    console.log(`Edge clicked: ${edge.from} to ${edge.to}`);
  };

  const getNodePosition = (node) => {
    const radius = 200;
    const angle = (nodes.indexOf(node) / nodes.length) * 10 * Math.PI;
    return {
      x: Math.cos(angle) * radius + 250,
      y: Math.sin(angle) * radius + 150,
    };
  };

  const getNodePositionEdges = (node) => {
    const radius = 170;
    const angle = (nodes.indexOf(node) / nodes.length) * 10 * Math.PI;
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
                className={` ${
                  selectedNode?.find((w) => w == node) ? "selected" : "node"
                }`} // Add selected class
                cx={getNodePosition(node).x}
                cy={getNodePosition(node).y}
                r="30"
                color="white"
              />

              <text
                x={getNodePosition(node).x}
                y={getNodePosition(node).y}
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="black"
              >
                {node}
              </text>
            </>
          ))}

          {/* Render edges with updated wreckage*/}
          {edges.map((edge, idx) => (
            <>
              {!RoutedEdges ? (
                <>
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={getNodePositionEdges(edge.from).x}
                    y1={getNodePositionEdges(edge.from).y}
                    x2={getNodePositionEdges(edge.to).x}
                    y2={getNodePositionEdges(edge.to).y}
                    className={`${
                      wreckage.find(
                        (w) => w.from === edge.from && w.to === edge.to
                      )?.cond === true
                        ? "edge"
                        : "select"
                    }`}
                    onClick={() => handleEdgeClick(edge)}
                  />
                </>
              ) : (
                <>
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={getNodePositionEdges(edge.from).x}
                    y1={getNodePositionEdges(edge.from).y}
                    x2={getNodePositionEdges(edge.to).x}
                    y2={getNodePositionEdges(edge.to).y}
                    className={`${
                      RoutedEdges.find(
                        (w) => w.from === edge.from && w.to === edge.to
                      )
                        ? "edge"
                        : ""
                    }`}
                    onClick={() => handleEdgeClick(edge)}
                  />
                </>
              )}
            </>
          ))}
        </svg>

        <div>
          <button
            onClick={() => {
              setIsSidePanelOpen(!isSidePanelOpen);
            }}
          >
            {isSidePanelOpen ? "Close Side Panel" : "Open Side Panel"}
          </button>
          <Sidepanel
            isOpen={isSidePanelOpen}
            className={isSidePanelOpen ? "open" : ""}
          />

          <SourceDest handleNodeClick={handleNodeClick} />
        </div>
      </div>
    </>
  );
}
