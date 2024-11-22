import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import React from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function RegisterModal({
  handleModalClose,
  handleRegistration,
  isOpen,
  buttonText,
  openSignInModal,
}) {
  // how to use the hook
  const { values, handleChange, resetForm, errors } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(
      values.name,
      values.avatarUrl,
      values.email,
      values.password
    );
  };

  return (
    <ModalWithForm
      title="Sign Up"
      handleModalClose={handleModalClose}
      buttonText={buttonText}
      name="signup"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email *{" "}
        <input
          name="email"
          className="modal__input"
          id="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email}
          minLength={2}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password *{" "}
        <input
          className="modal__input"
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label htmlFor="name" className="modal__label">
        Name *{" "}
        <input
          name="name"
          className="modal__input"
          id="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          minLength={2}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL{" "}
        <input
          className="modal__input"
          name="avatarUrl"
          id="avatarUrl"
          type="url"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={values.avatarUrl}
        />
        {errors.avatarUrl && (
          <span className="modal__error">{errors.avatarUrl}</span>
        )}
      </label>
      <button
        type="button"
        className="modal__btn-login"
        onClick={openSignInModal}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
