import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { currentDate } from "../../utils/constants.js";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";

function Header({ weatherData, openAddGarmentModal, toggleMobileMenu }) {
  return (
    <header className="header">
      <div className="header__mobile-view">
        <Link to="/">
          <img src={logo} alt="website logo" className="header__logo" />
        </Link>
        <button
          className="header__menu-icon"
          type="button"
          onClick={toggleMobileMenu}
        />
      </div>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <div className="header__user-container">
        <button
          type="button"
          onClick={openAddGarmentModal}
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <p className="header__username">Matt Rife</p>
          <img src={avatar} alt="Profile avatar" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
