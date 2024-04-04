import React, { useState } from "react";
import Dropdown from "./Dropdown";
import "../css/SidePanel.css";
import nodes from "../nodes";
export default function Sidepanel({ isOpen }) {
  const [node, setnode] = useState(nodes);
  //   console.log(node);
  return (
    <>
      {isOpen && (
        <div className="externalPanel">
          <div className="internalPanel">
            <h3>Select Weather Type : </h3>
            <div className="box-type">
              {node.map((data, key) => {
                return (
                  <div className="DropBox">
                    <strong style={{ marginBottom: "5px" }}>{data}</strong>
                    <Dropdown key={key} />
                  </div>
                );
              })}
            </div>

            <button type="submit" className="apply">
              Apply Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}
