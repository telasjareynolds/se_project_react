import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React from "react";
import { useState, useEffect } from "react";

function AddItemModal({ handleModalClose, onAddItem, isOpen }) {
  const [name, setName] = React.useState("");
  const [imgLink, setImgLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImgChange(e) {
    setImgLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, imgLink });
    onAddItem({ name, imgLink });
  };

  React.useEffect(() => {
    function handleFieldReset() {
      setName("");
      setImgLink("");
    }
  });

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
          value={imgLink}
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
            
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            className="modal__radio-input"
            type="radio"
            name="radio"
            value="cold"
           
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
