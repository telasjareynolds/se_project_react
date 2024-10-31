import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React from "react";
import { useState, useEffect } from "react";

function AddItemModal({ handleModalClose, onAddItem, isOpen }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImgChange(e) {
    setImageUrl(e.target.value);
  }

  function handleWeatherChange(e) {
    setWeather(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, imageUrl });
    onAddItem(name, imageUrl, weather);
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

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
            checked={weather === "hot"}
            onChange={handleWeatherChange}
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
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            className="modal__radio-input"
            type="radio"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
