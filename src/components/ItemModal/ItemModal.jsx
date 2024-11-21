import "./ItemModal.css";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function ItemModal({
  isOpen,
  selectedCard,
  handleModalClose,
  name,
  openConfirmDeleteModal,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  // check item owner is current user
  const isOwn = selectedCard.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "modal__delete-btn_visible" : "modal__delete-btn_hidden"
  }`;

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
          alt={selectedCard.name}
          src={selectedCard.imageUrl}
        />
        <div className="modal__text-container">
          <div>
            <h2 className="modal__caption">{selectedCard.name}</h2>
            <p className="modal__weather">Weather: {selectedCard.weather}</p>
          </div>
          <button
            type="button"
            className={itemDeleteButtonClassName}
            onClick={openConfirmDeleteModal}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
