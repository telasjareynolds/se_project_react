import "./ItemModal.css";

function ItemModal({
  isOpen,
  card,
  handleModalClose,
  name,
  openConfirmDeleteModal,
}) {
  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal_opened")) {
      handleModalClose();
    }
  }
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
      name={name}
    >
      <div className="modal__content_type_preview">
        <button
          onClick={handleModalClose}
          type="button"
          className="modal__close-btn"
        ></button>
        <img
          className="modal__preview-img"
          alt={card.name}
          src={card.imageUrl}
        />
        <div className="modal__text-container">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            className="modal__delete-btn"
            onClick={openConfirmDeleteModal}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
