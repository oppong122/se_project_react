import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./Header.css";

import logo from "../../assets/Logo.svg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({
  handleAddClick,
  weatherData,
  onLoginClick,
  onRegisterClick,
  isloggedIn,
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isUserReady = isloggedIn && currentUser;

  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </NavLink>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__user-container">
        <ToggleSwitch />
        {isUserReady ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>

            <NavLink to="/profile" className="profile__link">
              <div className="avatar__container">
                <p className="header__username">{currentUser.name}</p>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              </div>
            </NavLink>

            <button
              type="button"
              className="header__signout-btn"
              onClick={onSignOut}
            >
              Sign out
            </button>
          </>
        ) : (
          <div className="signup__login-btns">
            <button
              type="button"
              className="header__auth-btn"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__auth-btn"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
