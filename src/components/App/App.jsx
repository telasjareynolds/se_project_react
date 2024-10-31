import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import { filterWeatherData, weather } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { getItems, addItem } from "../../utils/api.js";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    main: { F: "" },
    city: "",
  });

  //get filtered cards based on weather
  useEffect(() => {
    weather()
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  const [clothingItems, setClothingItems] = useState([]);
  //get cards from api
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    isMenuOpen === false ? setIsMenuOpen(true) : setIsMenuOpen(false);
  };

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  function handleAddItem(item) {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  }

  //open confirm delete item modal

  const openConfirmDeleteModal = () => {
    setModalActive("delete");
  };

  function onDeleteItem(e) {
    e.preventDefault();
  }
  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            weatherData={weatherData}
            openAddGarmentModal={openAddGarmentModal}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  openPreviewImageModal={openPreviewImageModal}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  openPreviewImageModal={openPreviewImageModal}
                  openAddGarmentModal={openAddGarmentModal}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={modalActive === "add-garment"}
          modalActive={modalActive}
          handleModalClose={closeActivemodal}
          onAddItem={handleAddItem}
        />
        <ItemModal
          name="preview"
          isOpen={modalActive === "preview"}
          handleModalClose={closeActivemodal}
          card={selectedCard}
          openConfirmDeleteModal={openConfirmDeleteModal}
        />
        <ConfirmDeleteModal
          name="delete"
          isOpen={modalActive === "delete"}
          handleModalClose={closeActivemodal}
          card={selectedCard}
        />
        <MobileMenu
          isMenuOpen={isMenuOpen}
          closeMobileMenu={toggleMobileMenu}
          openAddGarmentModal={openAddGarmentModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
