import React, { useEffect, useState } from "react";
import "../css/Graph.css"; // Assuming Graph.css styles the circles
import edges from "../edges";
import nodes from "../nodes";
import Dropdown from "../components/Dropdown";
import Sidepanel from "../components/Sidepanel";
import SourceDest from "../components/SourceDest";
export default function Graph() {
  let count = 0;
  const [selectedNode, setSelectedNode] = useState(null); // Track selected node
  const [selectedEdges, setSelectedEdges] = useState(null); // Track selected node
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
  const [wreckage, setWreckage] = useState([
    { from: "A", to: "B", cond: "true" },
    { from: "B", to: "C", cond: "true" },
    { from: "C", to: "D", cond: "true" },
    { from: "D", to: "E", cond: "true" },
    { from: "E", to: "G", cond: "true" },
    { from: "G", to: "H", cond: "true" },
    { from: "E", to: "F", cond: "true" },
    { from: "H", to: "F", cond: "true" },
    { from: "F", to: "J", cond: "true" },
    { from: "H", to: "I", cond: "true" },
    { from: "J", to: "K", cond: "true" },
    { from: "K", to: "L", cond: "true" },
    { from: "B", to: "L", cond: "true" },
    { from: "L", to: "M", cond: "true" },
    { from: "M", to: "N", cond: "true" },
  ]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const handleNodeClick = (node) => {
    setSelectedNode(node);
    console.log(node);
    setIsOpen({ ...isOpen, [node]: !isOpen[node] });
    console.log(isOpen[node]);
  };
  const handleEdgeClick = (edge) => {
    setSelectedEdges({...selectedEdges,[edge.from]:{to: edge.to,count:""}});
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
                className={`node ${selectedNode === node ? "selected" : ""}`} // Add selected class
                // className="node selected"
                cx={getNodePosition(node).x}
                cy={getNodePosition(node).y}
                r="30"
                color="white"
                onClick={() => handleNodeClick(node)}
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

          {/* Render edges */}
          {edges.map((edge, idx) => (
            <>
              <line
                key={`${edge.from}-${edge.to}`}
                x1={getNodePositionEdges(edge.from).x}
                y1={getNodePositionEdges(edge.from).y}
                x2={getNodePositionEdges(edge.to).x}
                y2={getNodePositionEdges(edge.to).y}
                className={`${
                  selectedEdges?.[edge.from]?.to == edge.to ? "select" : ""
                }`}
                // className={`${(selectedEdges?.from==edge.from&&selectedEdges?.to==edge.to)?"select":"edge"}`}
                // className={`${
                //   // wreckage.find((w) => w.from === edge.from && w.to === edge.to)
                //   //   .cond == true
                //   false
                //     ? "select"
                //     : "edge"
                // }`}
                onClick={() => handleEdgeClick(edge)}
              />
              {selectedEdges?.[edge.from]?.to == edge.to && (
                <>
                  <text
                    x={
                      (getNodePositionEdges(edge.from).x +
                        getNodePositionEdges(edge.to).x) /
                        2
                    }
                    y={
                      (getNodePositionEdges(edge.from).y +
                        getNodePositionEdges(edge.to).y) /
                        2
                    }
                    fontSize="30"
                  >
                    {selectedEdges?.[edge.from]?.count}
                  </text>
                  {/* <text x={getNodePositionEdges(edge.to).x-10} y={getNodePositionEdges(edge.from).y-10} fontSize="20">{count++}</text> */}
                </>
              )}
            </>
          ))}
        </svg>
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

        <SourceDest
          selectedEdges={selectedEdges}
          setSelectedEdges={setSelectedEdges}
        />
      </div>
    </>
  );
}
