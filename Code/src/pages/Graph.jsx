import React, { useEffect, useState } from "react";
import "../css/Graph.css"; // Assuming Graph.css styles the circles
import edges from "../js/edges";
import nodes from "../js/nodes";
import Sidepanel from "../components/Sidepanel";
import SourceDest from "../components/SourceDest";
import weather from "../js/weather";
export default function Graph() {
  const [selectedNode, setSelectedNode] = useState(null); // Track selected node
  const [selectedEdges, setSelectedEdges] = useState(null); // Track selected node
  const [RoutedEdges, setRoutedEdges] = useState(null); // Track Routed node
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [wreckage, setWreckage] = useState(null);
  const [Weathers , setWeathers] = useState(null);

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
      [edge.from]: { to: edge.to },
    });
    const updatedWreckage = wreckage ? [...wreckage] : [];
    let index = updatedWreckage.findIndex(
      (w) => w.from == edge.from && w.to == edge.to
    );
    console.log(index);
    if (index != -1) updatedWreckage.splice(index, 1);
    else updatedWreckage.push({ from: edge.from, to: edge.to });
    setWreckage(updatedWreckage);

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
  
  const getSetWeathers = (val )=>{
    console.log(val)
     setWeathers(val);
  }

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
                      wreckage?.find(
                        (w) => w.from === edge.from && w.to === edge.to
                      )
                        ? "select"
                        : "edge"
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
                  {/* <text
                    key={`${edge.from}-${edge.to}`}
                    x1={getNodePositionEdges(edge.from).x}
                    y1={getNodePositionEdges(edge.from).y}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="black"
                  >1</text> */}
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
            getSetWeathers={getSetWeathers}
            className={isSidePanelOpen ? "open" : ""}
          />

          <SourceDest handleNodeClick={handleNodeClick} wreckage={wreckage} weatherReport={Weathers}/>
        </div>
      </div>
    </>
  );
}
