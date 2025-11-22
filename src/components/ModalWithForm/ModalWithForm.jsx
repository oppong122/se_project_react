import closeButton from "../../assets/close.svg";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  isDisabled,
  secodaryButton,
}) {
  if (!isOpen) return null;
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="form__title">{title}</h2>
        <button onClick={onClose} className="modal__close-button" type="button">
          <img src={closeButton} alt="close" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="signin__up-btn">
            <button
              type="submit"
              className="modal__submit"
              disabled={isDisabled}
            >
              {buttonText}
            </button>
            {secodaryButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
