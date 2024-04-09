import React from "react";
import { useState } from "react";
import weather from "../js/weather";
import "../css/Dropdown.css";
export default function Dropdown({onhandleChange , node}) {
  const [selectedValue, setSelectedValue] = useState();

  const handleChangeWeather = (event) => {
    event.preventDefault();
    onhandleChange({val : event.target.value , node : node });
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
