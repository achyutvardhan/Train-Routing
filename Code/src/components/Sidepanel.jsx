import React, { useState } from "react";
import Dropdown from "./Dropdown";
import "../css/SidePanel.css";
import nodes from "../js/nodes";
export default function Sidepanel({ isOpen, getSetWeathers }) {
  const [node, setnode] = useState(nodes);
  const [weather, setWeather] = useState(null);
  //   console.log(node);

  const onhandleChange = (value) => {
    const updatedVal = weather ? [...weather] : [];
    var index = updatedVal.findIndex((w) => w.node == value.node);
    if (index !== -1) {
      updatedVal.splice(index, 1);
    }
    updatedVal.push(value);
    setWeather(updatedVal);
  };

  const onhandleSubmit = (e)=>{
      e.preventDefault();
      getSetWeathers(weather);
  }
  // console.table(weather);
  return (
    <>
      {isOpen && (
        <div className="externalPanel">
          <div className="internalPanel">
            <h3>Select Weather Type : </h3>
            <div className="box-type">
              {node.map((data, key) => {
                return (
                  <div className="DropBox" key={key}>
                    <strong style={{ marginBottom: "5px" }}>{data}</strong>
                    <Dropdown
                      key={key}
                      onhandleChange={onhandleChange}
                      node={data}
                    />
                  </div>
                );
              })}
            </div>

            <button type="submit" className="apply" onClick={onhandleSubmit}>
              Apply Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}
