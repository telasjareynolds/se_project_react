import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import { filterWeatherData, weather } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    main: { F: "" },
    city: "",
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //getWeatherType(weatherData.main.temp)
  useEffect(() => {
    weather()
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  const [modalActive, setModalActive] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const openAddGarmentModal = () => {
    setModalActive("add-garment");
  };
  const openPreviewImageModal = (card) => {
    setModalActive("preview");
    setSelectedCard(card);
  };
  const closeActivemodal = () => {
    setModalActive("");
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log(isMenuOpen);
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header
          weatherData={weatherData}
          openAddGarmentModal={openAddGarmentModal}
          toggleMobileMenu={toggleMobileMenu}
        />
        <Main
          weatherData={weatherData}
          openPreviewImageModal={openPreviewImageModal}
        />
        <Footer />
      </div>
      <ModalWithForm
        isOpen={modalActive === "add-garment"}
        buttonText="Add garment"
        title="New garment"
        name="clothes"
        modalActive={modalActive}
        handleModalClose={closeActivemodal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            className="modal__input"
            id="name"
            type="text"
            placeholder="Name"
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
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              className="modal__radio-input"
              type="radio"
              name="radio"
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              className="modal__radio-input"
              type="radio"
              name="radio"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        name="preview"
        isOpen={modalActive === "preview"}
        handleModalClose={closeActivemodal}
        card={selectedCard}
      />
      <MobileMenu
        isMenuOpen={isMenuOpen}
        closeMobileMenu={toggleMobileMenu}
        openAddGarmentModal={openAddGarmentModal}
      />
    </div>
  );
}

export default App;
