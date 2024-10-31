import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React from "react";
import { useState, useEffect } from "react";
import App from "../App/App";

function AddItemModal({ handleModalClose, onAddItem, isOpen }) {
  const [name, setName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [tempType, setTempType] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImgChange(e) {
    setImageUrl(e.target.value);
  }

  function handleTempTypeChange(e) {
    setTempType(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, imageUrl });
    onAddItem({ name, imageUrl, tempType });
    handleModalClose();
  };

  return (
    <ModalWithForm
      title="New garment"
      handleModalClose={handleModalClose}
      buttonText="Add garment"
      name="clothes"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          className="modal__input"
          id="name"
          type="text"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        {" "}
        Image
        <input
          className="modal__input"
          id="imageUrl"
          type="text"
          placeholder="Image URL"
          onChange={handleImgChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            className="modal__radio-input"
            type="radio"
            name="radio"
            value="hot"
            checked={tempType === "hot"}
            onChange={handleTempTypeChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            className="modal__radio-input"
            type="radio"
            name="radio"
            value="warm"
            checked={tempType === "warm"}
            onChange={handleTempTypeChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            className="modal__radio-input"
            type="radio"
            value="cold"
            checked={tempType === "cold"}
            onChange={handleTempTypeChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
