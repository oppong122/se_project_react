import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddClick, weatherData }) {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__user-container">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + add clothes
        </button>
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
