import React, { useState } from "react";
import nodes from "../nodes";
import "../css/sourceDest.css";
import edges from "../edges";
export default function SourceDest({selectedEdges, setSelectedEdges}) {
  const [source, setSource] = useState(nodes[0]);
  const [destination, setDestination] = useState(nodes[nodes.length - 1]);
  const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97
  const numAlpha = (s) => String.fromCharCode(s+65)
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
    var edges_list = edges.map((ele)=>{
      const e = Object.assign({}, ele);
      e.distance = parseInt(e.distance)
      e.to = alphaVal(e.to)
      e.from = alphaVal(e.from)
      return e
    })
    algo(edges_list,nodes.length,edges.length,alphaVal(source))
  };

  const algo = (graph, V, E, src) => {
    let dis = Array(V).fill(Infinity);

    dis[src] = 0;
    var predecessor = []
    for (let i = 0; i < V - 1; i++) {
      for (let j = 0; j < E; j++) {
        if (dis[graph[j].from] + graph[j].distance < dis[graph[j].to]) {
          dis[graph[j].to] = dis[graph[j].from] + graph[j].distance;
          predecessor[graph[j].to] = graph[j].from
        }
      }
    }
    var current = alphaVal(destination)
    var path = [] //empty list
    while (current != undefined){
      path.unshift(current)
      current = predecessor[current]
    }

    for (let i = 0; i < E; i++) {
      let x = graph[i].from;
      let y = graph[i].to;
      let weight = graph[i].distance;

      if (dis[x] != Infinity && dis[x] + weight < dis[y]) {
        console.log("Graph contains negative weight cycle");
        return;
      }
    }
    var temp = {};
    for(let i = 1; i < path.length;i++){
      temp = {...temp,[numAlpha(path[i-1])]:{to:numAlpha(path[i]),count:i}}
    }
    setSelectedEdges(temp)
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
