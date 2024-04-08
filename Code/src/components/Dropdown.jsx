import React from "react";
import { useState } from "react";
import weather from "../js/weather";
import "../css/Dropdown.css";
export default function Dropdown() {
  const [selectedValue, setSelectedValue] = useState();

  const handleChangeWeather = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div className="dropdown">
        <select
          value={selectedValue}
          name="weather"
          onChange={handleChangeWeather}
        >
          <option value="">Select...</option>
          {weather.map((data, key) => (
            <option value={data.fact} key={key}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
