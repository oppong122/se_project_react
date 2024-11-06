import "./Header.css";
import logo from "../../assets/Logo.svg";
import avarta from "../../assets/avatar.png";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="" className="header__logo" />
      <p className="header__date-location">{currentDate}, New York</p>
      <button className="header__add-clothes-btn">+ add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avarta} t="Terrence" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
