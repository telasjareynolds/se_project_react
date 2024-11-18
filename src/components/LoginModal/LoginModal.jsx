import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import React from "react";
import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function LoginModal({ handleModalClose, onLogin, isOpen, buttonText }) {
  // how to use the hook
  const { values, handleChange, resetForm, errors } = useFormWithValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values.email, values.password);
  };

  return (
    <ModalWithForm
      title="Log In"
      handleModalClose={handleModalClose}
      buttonText={buttonText}
      name="login"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
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
        Password{" "}
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
    </ModalWithForm>
  );
}

export default LoginModal;
