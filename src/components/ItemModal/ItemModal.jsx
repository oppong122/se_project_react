import "./ItemModal.css";
import closeButton from "../../assets/close.svg";
import DeleteItemModal from "../DeleteModal/DeleteModal";

function ItemModal({ activeModal, card, onClose, handleOpenDelete }) {
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
          <button className="delete__button" onClick={handleOpenDelete}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
