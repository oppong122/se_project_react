import { useContext } from "react";
import CurrentUserContext from "../../context/currentUserContext";

// import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar({ onLogout, onProfileEdit }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__main">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={currentUser.name}
        />
        <p className="sidebar__userName">{currentUser.name}</p>
      </div>
      <div className="sidebar__sub">
        <button
          className="profile__edit"
          type="button"
          onClick={() => {
            onProfileEdit?.();
          }}
        >
          Change profile data
        </button>
        <button className="profile__logout" type="button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
