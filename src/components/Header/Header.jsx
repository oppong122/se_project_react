import { NavLink } from "react-router-dom";
import "./Header.css";

import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddClick, weatherData, onToggleChange, isToggled }) {
  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </NavLink>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__user-container">
        <ToggleSwitch
          onChange={(value) => onToggleChange(value)}
          isOn={isToggled}
        />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      </div>
      <NavLink to="/Profile" className="profile__link">
        <div className="avatar__container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence" className="header__avatar" />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
