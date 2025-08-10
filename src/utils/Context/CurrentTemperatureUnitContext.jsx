import React from "react";
import "./currentTemperatureUnitContext.css";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnitContext: "",
  handleToggleSwitchChange: () => {},
});

export { CurrentTemperatureUnitContext };
