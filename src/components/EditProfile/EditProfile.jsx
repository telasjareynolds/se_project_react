import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useContext, useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function EditModal({
  handleModalClose,
  handleEditProfile,
  isOpen,
  buttonText,

}) {
const currentUser = useContext(CurrentUserContext);

  // how to use the hook
  const { values, setValues, handleChange, errors } = useFormWithValidation();

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name,
        avatarUrl: currentUser.avatar,
      });
    }
  }, [isOpen, setValues, currentUser]);

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
      <label className="modal__label">
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
      <label className="modal__label">
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
