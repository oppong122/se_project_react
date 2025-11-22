import "./DeleteModal.css";
import closeDeleteModal from "../../assets/close.svg";

const DeleteItemModal = ({ isOpen, handleDeleteItem, onCloseDelete, card }) => {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal_container modal_container-delete">
        <button className="close_Delet-Modal" onClick={onCloseDelete}>
          <img
            className="close_delete"
            src={closeDeleteModal}
            alt="closeDelet"
          />
        </button>
        <div className="confirmation">
          <p className="comfirm_delet-text">
            Are you sure you want to delete this item?
            <span className="subText">This action is irreversible.</span>
          </p>
          <button
            className="confirm_delete"
            onClick={() => handleDeleteItem(card._id)}
          >
            Yes, delete item
          </button>
          <button className="cancel_delete" onClick={onCloseDelete}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemModal;
