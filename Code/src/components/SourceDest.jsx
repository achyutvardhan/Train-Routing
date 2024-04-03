import React, { useState } from "react";
import nodes from "../nodes";
import "../css/sourceDest.css"
export default function SourceDest() {
  const [source, setSource] = useState(nodes[0]);
  const [destination, setDestination] = useState(nodes[nodes.length - 1]);

  const handleChangeSource = (event) => {
    setSource(event.target.value);
    // Optionally perform actions based on the selected value
  };
  const handleChangeDestination = (event) => {
    setDestination(event.target.value);
    // Optionally perform actions based on the selected value
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(first);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="pathFinder">
        <label>Source :</label>
        <select value={source} name="source" onChange={handleChangeSource}>
          <option value="">Select...</option>
          {nodes.map((data, key) => {
            return (
              <option value={data} key={key}>
                {data}
              </option>
            );
          })}
        </select>
        <label htmlFor="">Destination :</label>
        <select
          name="destination"
          value={destination}
          onChange={handleChangeDestination}
        >
          <option value="">Select...</option>
          {nodes.map((data, key) => {
            return (
              <option value={data} key={key}>
                {data}
              </option>
            );
          })}
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
