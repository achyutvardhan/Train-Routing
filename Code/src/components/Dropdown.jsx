import React from "react";
import { useState } from "react";
import weather from "../weather";
export default function Dropdown({ handleOpen }) {
  const [selectedValue, setSelectedValue] = useState(String(weather[5].fact));
  console.log(weather[5].fact);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleApply = () => {
    // send factor to backend
    handleOpen(false);
  };
  return (
    <>
      <select>
        <option value="someOption">Some option</option>
        <option value="otherOption">Other option</option>
      </select>
      <button onClick={handleApply}>Apply</button>
    </>
  );
}
