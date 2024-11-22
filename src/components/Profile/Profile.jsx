import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  openPreviewImageModal,
  openAddGarmentModal,
  clothingItems,
  currentUser,
  selectedCard
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        {console.log(clothingItems)}
        <SideBar currentUser={currentUser} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          openPreviewImageModal={openPreviewImageModal}
          openAddGarmentModal={openAddGarmentModal}
          clothingItems={clothingItems}
          selectedCard={selectedCard}
        />
      </section>
    </div>
  );
}

export default Profile;
