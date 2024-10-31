import "./ClothesSections.css";
import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSections({
  openPreviewImageModal,
  openAddGarmentModal,
  clothingItems,
}) {
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
        {clothingItems.map((item) => {
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

export default ClothesSections;
