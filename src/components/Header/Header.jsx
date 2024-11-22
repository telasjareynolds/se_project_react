import "./Header.css";
import logo from "../../assets/logo.svg";
import { currentDate } from "../../utils/constants.js";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Header({
  weatherData,
  openAddGarmentModal,
  toggleMobileMenu,
  openSignInModal,
  openSignUpModal,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isLoggedIn = currentUser && currentUser.name;

  const getInitial = (name) => {
    if (name) {
      return name[0].toUpperCase();
    }
    return "?";
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="website logo" className="header__logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <div className="header__user-container">
          <div className="header__mobile-view">
            <button
              className="header__menu-icon"
              type="button"
              onClick={toggleMobileMenu}
            />
          </div>
          <button
            type="button"
            onClick={openAddGarmentModal}
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="Profile avatar"
                className="header__avatar"
              />
            ) : (
              <div className="header__placeholder">
                {getInitial(currentUser.name)}
              </div>
            )}
          </Link>
        </div>
      ) : (
        <div className="header__guest-nav">
          <button
            onClick={openSignUpModal}
            type="button"
            className="header__signup"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="header__signin"
            onClick={openSignInModal}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
