import React, { useState, useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle">
      <input
        type="checkbox"
        className="toggle__box"
        onChange={handleToggleSwitchChange}
        value={currentTemperatureUnit}
      />
      <span
        className={`toggle__temp ${
          currentTemperatureUnit === "F" ? "toggle__temp-f" : "toggle__temp-c "
        }`}
      ></span>
      <p
        className={`toggle__f ${
          currentTemperatureUnit === "F" && "toggle__active"
        }`}
      >
        F
      </p>
      <p
        className={`toggle__c ${
          currentTemperatureUnit === "C" && "toggle__active"
        }`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
