import { useContext, useEffect, useState } from "react";
import currentUserContext from "../../context/currentUserContext";
import "./EditProfileModal.css";
import closeButton from "../../assets/close.svg";

function EditProfileModal({ isOpen, onClose, isSaving, onSubmit }) {
  const currentUser = useContext(currentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: name.trim(), avatar: avatar.trim() });
  };
  if (!isOpen) return null;

  return (
    <div className="modal modal_open ">
      <div className="modal__content">
        <button
          className="modal__close-button "
          type="button"
          onClick={onClose}
        >
          <img src={closeButton} alt="close" />
        </button>
        <form className="modal__form " onSubmit={handleSubmit}>
          <h3 className="form__title form__title-edit">Change profile data</h3>

          <label className="modal__label-edit">
            Name
            <input
              className="modal__label-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="modal__label-edit">
            Avatar URL
            <input
              className="modal__label-input"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </label>

          <button
            className="modal__submit-edit"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
