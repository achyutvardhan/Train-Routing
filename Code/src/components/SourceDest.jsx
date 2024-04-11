import { useState } from "react";
import nodes from "../js/nodes";
import "../css/sourceDest.css";
import edges from "../js/edges";
import {floydWarshall, shortestpath} from "../js/floydWarshall";

const alphaVal = (s) => isNaN(s)?s.toLowerCase().charCodeAt(0) - 97:s
const numAlpha = (s) => String.fromCharCode(s+65)

export default function SourceDest({handleNodeClick , wreckage , weatherReport}) {
  var wrekageList = edges.filter((e)=>!wreckage?.some((temp) => e.from == temp.from && e.to == temp.to))
  // console.log("weather",weatherReport)

  // console.log(weatherReport)
  var edges_list = wrekageList.map((ele)=>{
    const e = Object.assign({}, ele);
    e.distance = parseInt(e.distance);
    e.to = alphaVal(e.to)
    e.from = alphaVal(e.from)
    return e
  })
  weatherReport?.map((e) => (e.node = alphaVal(e.node)));
  var result = floydWarshall(edges_list,nodes,weatherReport)
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
    // console.log(matrix)
    var shortpath = shortestpath(result[1],alphaVal(source),alphaVal(destination))
    // console.log(shortpath?.map((e)=>numAlpha(e)))
    var finalOutput = shortpath?.map((e)=>numAlpha(e));
    // console.log(finalOutput)
    handleNodeClick(finalOutput);
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
