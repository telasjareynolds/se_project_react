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
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import * as api from "../../utils/api.js";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import {
  register,
  login,
  checkToken,
  editProfileData,
} from "../../utils/auth.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { getToken, setToken, removeToken } from "../../utils/token.js";
import EditModal from "../EditProfile/EditProfile.jsx";

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
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
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
        setIsLoggedInLoading(false);
        setIsLoggedIn(true);
        setCurrentUser(data.user);
      })
      .catch((error) => {
        console.error("Invalid token:", error);
        removeToken();
        setIsLoggedInLoading(false);
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
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error("Error getting items"));
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
      .then(() => {
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

  const handleEditProfile = (name, avatar) => {
    const token = getToken();

    if (!currentUser) {
      console.error("User not authorized to modify profile");
      return;
    }

    setIsLoading(true);
    editProfileData(name, avatar, token)
      .then((userData) => {
        const user = userData.user;
        setCurrentUser({
          _id: currentUser._id,
          email: currentUser.email,
          name: user.name,
          avatar: user.avatar,
        });
        closeActivemodal();
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  const handleLogOut = () => {
    if (isLoggedIn) {
      removeToken();
      setIsLoggedIn(false);
      setCurrentUser({});

      closeActivemodal();
    } else {
      console.error("Cannot be logged out.");
    }
  };

  //switch tempature units
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  // add clothing items
  function onAddItem(name, imageUrl, weather) {
    const token = getToken();
    if (!token) {
      console.error("User not authorized to add items.");
      return;
    }
    setIsLoading(true);

    api
      .addItem({ name, imageUrl, weather }, token)
      .then((data) => {
        setClothingItems((clothingItems) => [data, ...clothingItems]);
        closeActivemodal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      })
      .finally(() => setIsLoading(false));
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();

    if (!isLiked) {
      api
        .addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.error(err));
    } else {
      api
        .removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.error(err));
    }
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
  //open confirm delete item modal

  const openConfirmDeleteModal = () => {
    setModalActive("delete");
  };

  //open modal for changing profile info
  const openEditProfileModal = () => {
    setModalActive("edit");
  };

  function onDeleteItem(id) {
    const token = getToken();

    if (!token) {
      console.error("User not authorized to delete item");
      return;
    }
    api
      .deleteItem(id, token)
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isLoggedInLoading={isLoggedInLoading}
                  >
                    <Profile
                      openPreviewImageModal={openPreviewImageModal}
                      openAddGarmentModal={openAddGarmentModal}
                      clothingItems={clothingItems}
                      currentUser={currentUser}
                      selectedCard={selectedCard}
                      openEditProfileModal={openEditProfileModal}
                      handleLogOut={handleLogOut}
                      onCardLike={handleCardLike}
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
          <EditModal
            isOpen={modalActive === "edit"}
            handleModalClose={closeActivemodal}
            handleEditProfile={handleEditProfile}
            buttonText={isLoading ? "Saving..." : "Save changes"}
            currentUser={currentUser}
          />
          <ConfirmDeleteModal
            name="delete"
            isOpen={modalActive === "delete"}
            handleModalClose={closeActivemodal}
            selectedCard={selectedCard}
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
