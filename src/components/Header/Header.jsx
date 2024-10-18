import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { currentDate } from "../../utils/constants.js";

function Header({ weatherData, openAddGarmentModal }) {
  return (
    <header className="header">
      <img src={logo} alt="website logo" className="header__logo" />
      <p className="header__date-location">
        {currentDate}, {weatherData.name}
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
