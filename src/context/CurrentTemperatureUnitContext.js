import React from "react";

const currentTemperatureUnitContext = React.createContext({
  currentTemperatureUnitContext: "",
  handleToggleSwitchChange: () => {},
});

export { currentTemperatureUnitContext };
