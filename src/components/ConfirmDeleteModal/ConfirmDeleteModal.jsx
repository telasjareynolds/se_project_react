import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({
  isOpen,
  onDeleteItem,
  selectedCard,
  handleModalClose,
  name,
  buttonText,
}) {
  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal_opened")) {
      handleModalClose();
    }
  }
  function handleDelete() {
    onDeleteItem(selectedCard._id);
  }

  console.log(selectedCard._id);
  
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
      name={name}
    >
      <div className="modal__content_type_delete">
        <button
          onClick={handleModalClose}
          type="button"
          className="modal__close-btn"
        ></button>
        <div className="modal__container">
          <p className="modal__question">
            Are you sure you want to delete this item? <br /> This action is
            irreversible.
          </p>
          <button
            type="button"
            className="modal__delete-btn"
            onClick={handleDelete}
          >
            {buttonText}
          </button>
          <button
            type="button"
            className="modal__cancel-btn"
            onClick={handleModalClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
