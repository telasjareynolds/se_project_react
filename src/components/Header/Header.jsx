import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { currentDate } from "../../utils/constants.js";

function Header({ weatherData, openAddGarmentModal, toggleMobileMenu }) {
  return (
    <header className="header">
      <div className="header__mobile-view">
        <img src={logo} alt="website logo" className="header__logo" />
        <button
          className="header__menu-icon"
          type="button"
          onClick={toggleMobileMenu}
        />
      </div>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__user-container">
        <button
          type="button"
          onClick={openAddGarmentModal}
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <p className="header__username">Matt Rife</p>
        <img src={avatar} alt="Profile avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
