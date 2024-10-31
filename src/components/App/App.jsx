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
import { getItems, addItem, deleteItem } from "../../utils/api.js";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    main: { F: "" },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [modalActive, setModalActive] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  //get filtered cards based on weather
  useEffect(() => {
    weather()
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  //get cards from api
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  //Open and close modals
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
  // mobile menu opening
  const toggleMobileMenu = () => {
    isMenuOpen === false ? setIsMenuOpen(true) : setIsMenuOpen(false);
  };

  //switch tempature units
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  // add clothing items
  function onAddItem(name, imageUrl, weather) {
    addItem({ name, imageUrl, weather })
      .then((data) => {
        setClothingItems((clothingItems) => [...clothingItems, data]);
        closeActivemodal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  }

  //open confirm delete item modal

  const openConfirmDeleteModal = () => {
    setModalActive("delete");
  };

  function onDeleteItem(id) {
    console.log("Deleting item with ID:", id);
    deleteItem(id)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== id
        );
        setClothingItems(updatedClothingItems);
        closeActivemodal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
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
          handleModalClose={closeActivemodal}
          onAddItem={onAddItem}
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
          onDeleteItem={onDeleteItem}
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
