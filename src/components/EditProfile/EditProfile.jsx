import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function EditModal({
  handleModalClose,
  handleEditProfile,
  isOpen,
  buttonText,
}) {
  // how to use the hook
  const { values, handleChange, errors } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(values.name, values.avatarUrl);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      handleModalClose={handleModalClose}
      buttonText={buttonText}
      name="edit"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name *{" "}
        <input
          name="name"
          className="modal__input"
          id="edit-name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          minLength={2}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar *{" "}
        <input
          className="modal__input"
          name="avatarUrl"
          id="edit-avatar"
          type="url"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={values.avatarUrl}
        />
        {errors.avatarUrl && (
          <span className="modal__error">{errors.avatarUrl}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditModal;
