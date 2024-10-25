import "./MobileMenu.css";
import avatar from "../../assets/avatar.png";

function MobileMenu({closeMobileMenu, isMenuOpen, openAddGarmentModal}) {
  return (
    <div className="mobile__menu">
    <div className={`mobile__user-container ${isMenuOpen ? "mobile__user-container_active" : ""}`} >
      <button
          onClick={closeMobileMenu}
          type="button"
          className="mobile__close-btn"
        ></button>
      <p className="header__username">Matt Rife</p>
      <img src={avatar} alt="Profile avatar" className="mobile__avatar" />
      <button
        type="button"
        onClick={openAddGarmentModal}
        className="mobile__add-clothes-btn"
      >
        + Add clothes
      </button>
    </div>
    </div>
  );
}

export default MobileMenu;
