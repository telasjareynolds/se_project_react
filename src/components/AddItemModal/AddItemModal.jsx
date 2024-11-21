import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
import React from "react";
import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function AddItemModal({ handleModalClose, onAddItem, isOpen, buttonText }) {
  // how to use the hook
  const { values, handleChange, resetForm, errors } = useFormWithValidation();

  // useEffect(() => {
  //   if (isOpen) {
  //     resetForm();
  //   }
  // }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values.name, values.imageUrl, values.weather);
    resetForm();
  };

  return (
    <ModalWithForm
      title="New garment"
      handleModalClose={handleModalClose}
      buttonText={buttonText}
      name="clothes"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
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
      <label htmlFor="imageUrl" className="modal__label">
        {" "}
        Image
        <input
          className="modal__input"
          name="imageUrl"
          id="imageUrl"
          type="url"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
