import closeButton from "../../assets/close.svg";
import "./ModalWithForm.css";
function ModalWithForm({ children, buttonText, title, activeModal, OnClose }) {
  const isOpen = `modal ${activeModal === "add-garment" && "modal_opened"}`;
  return (
    <div className={isOpen}>
      <div className="modal__content">
        <h2 className="form__title">{title}</h2>
        <button onClick={OnClose} className="modal__close-button" type="button">
          <img src={closeButton} alt="close" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
