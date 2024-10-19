import "./ItemModal.css";

function ItemModal({ isOpen, card, handleModalClose, name }) {
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
      <div className="modal__content modal__content_type_preview">
        <button
          onClick={handleModalClose}
          type="button"
          className="modal__close-btn"
        ></button>
        <img className="modal__preview-img" alt={card.name} src={card.link} />
        <div className="modal__text-container">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
