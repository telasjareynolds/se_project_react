import "./ModalWithForm.css";

function ModalWithForm({
  children,
  name,
  buttonText,
  title,
  isOpen,
  handleModalClose,
  onSubmit,
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
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleModalClose}
          type="button"
          className="modal__close-btn"
        />
        <form
          className={`modal__form modal_type_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
