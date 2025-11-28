import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./ItemModal.css";
import closeButton from "../../assets/close.svg";

function ItemModal({ activeModal, card, onClose, onDelete }) {
  const isOpen = activeModal === "preview" && card;
  const currentUser = useContext(CurrentUserContext);

  const ownerId = typeof card.owner === "object" ? card.owner._id : card.owner;

  const isOwn = ownerId === currentUser?._id;
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;
  if (!isOpen) return null;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} className="modal__close-button" type="button">
          <img src={closeButton} alt="close" />
        </button>
        <img src={card.imageUrl} alt="card" className="modal__image" />

        <div className="modal__footer modal__footer-item">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            className={itemDeleteButtonClassName}
            type="button"
            onClick={onDelete}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
