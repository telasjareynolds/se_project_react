import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import { filterWeatherData, weather } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { getItems, addItem, deleteItem } from "../../utils/api.js";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import { register, login, checkToken } from "../../utils/auth.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { getToken, setToken, removeToken } from "../../utils/token.js";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  //check is there's a token in localStorage
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      console.log("No token found in localStorage");
      return;
    }

    checkToken(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
      })
      .catch((error) => {
        console.error("Invalid token:", error);
        removeToken();
      });
  }, []);

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

  //Stop ESC listener if there are no active modals
  useEffect(() => {
    if (!modalActive) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActivemodal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [modalActive]);

  //Configure user registration
  const handleRegistration = (name, avatar, email, password) => {
    register(name, avatar, email, password)
      .then((data) => {
        console.log("User registered successfully:", data);
        handleLogin(email, password);
        closeActivemodal();
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  // Configure user authorization
  const handleLogin = (email, password) => {
    if (!email || !password) {
      return;
    }

    login(email, password)
      .then((data) => {
        if (data.token && data.user) {
          //store token in storage
          setToken(data.token);
          setIsLoggedIn(true);
          setCurrentUser(data.user);

          //Update application state
        } else {
          console.error("No JWT token found in the response.");
        }
        closeActivemodal();
      })
      .catch((error) => {
        console.error("Error logging user in:", error);
      });
  };

  //Open and close modals
  const openAddGarmentModal = () => {
    setModalActive("add-garment");
  };
  const openPreviewImageModal = (card) => {
    setModalActive("preview");
    setSelectedCard(card);
  };
  const openSignUpModal = (e) => {
    e.preventDefault();
    setModalActive("register");
  };
  const openSignInModal = (e) => {
    e.preventDefault();
    setModalActive("login");
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
    setIsLoading(true);

    addItem({ name, imageUrl, weather })
      .then((data) => {
        setClothingItems((clothingItems) => [data, ...clothingItems]);
        closeActivemodal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      })
      .finally(() => setIsLoading(false));
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              weatherData={weatherData}
              openAddGarmentModal={openAddGarmentModal}
              toggleMobileMenu={toggleMobileMenu}
              openSignInModal={openSignInModal}
              openSignUpModal={openSignUpModal}
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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      openPreviewImageModal={openPreviewImageModal}
                      openAddGarmentModal={openAddGarmentModal}
                      clothingItems={clothingItems}
                      currentUser={currentUser}
                      selectedCard={selectedCard}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <RegisterModal
            isOpen={modalActive === "register"}
            handleModalClose={closeActivemodal}
            handleRegistration={handleRegistration}
            buttonText={isLoading ? "Saving..." : "Sign Up"}
            openSignInModal={openSignInModal}
          />

          <LoginModal
            isOpen={modalActive === "login"}
            handleModalClose={closeActivemodal}
            handleLogin={handleLogin}
            buttonText={isLoading ? "Saving..." : "Log In"}
            openSignUpModal={openSignUpModal}
          />

          <AddItemModal
            isOpen={modalActive === "add-garment"}
            handleModalClose={closeActivemodal}
            onAddItem={onAddItem}
            buttonText={isLoading ? "Saving..." : "Add garment"}
          />
          <ItemModal
            name="preview"
            isOpen={modalActive === "preview"}
            handleModalClose={closeActivemodal}
            selectedCard={selectedCard}
            openConfirmDeleteModal={openConfirmDeleteModal}
          />
          <ConfirmDeleteModal
            name="delete"
            isOpen={modalActive === "delete"}
            handleModalClose={closeActivemodal}
            SelectedCard={selectedCard}
            onDeleteItem={onDeleteItem}
            buttonText={isLoading ? "Saving..." : "Yes, delete item"}
          />
          <MobileMenu
            isMenuOpen={isMenuOpen}
            closeMobileMenu={toggleMobileMenu}
            openAddGarmentModal={openAddGarmentModal}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
