import { useState } from "react";
import nodes from "../js/nodes";
import "../css/sourceDest.css";
import edges from "../js/edges";
import {floydWarshall, shortestpath} from "../js/floydWarshall";

const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97
const numAlpha = (s) => String.fromCharCode(s+65)
var edges_list = edges.map((ele)=>{
  const e = Object.assign({}, ele);
  e.distance = parseInt(e.distance)
  e.to = alphaVal(e.to)
  e.from = alphaVal(e.from)
  return e
})
var result = floydWarshall(edges_list,nodes)
export default function SourceDest({selectedEdges, setSelectedEdges}) {
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
    var matrix = result[0]
    var shortpath = shortestpath(result[1],alphaVal(source),alphaVal(destination))
    console.log(matrix)
    console.log(shortpath?.map((e)=>numAlpha(e)))
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
