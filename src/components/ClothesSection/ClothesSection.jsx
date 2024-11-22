import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import React from "react";

function ClothesSection({
  openPreviewImageModal,
  openAddGarmentModal,
  clothingItems,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes__section">
      <div className="clothes__section-text">
        <p className="clothes__section-heading">Your items</p>
        <button
          type="button"
          className="clothes__section-btn"
          onClick={openAddGarmentModal}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes__section-list">
        {userClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              openPreviewImageModal={openPreviewImageModal}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
