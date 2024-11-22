import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  openPreviewImageModal,
  openAddGarmentModal,
  clothingItems,
  currentUser,
  selectedCard,
  openEditProfileModal,
  handleLogOut
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar currentUser={currentUser} openEditProfileModal={openEditProfileModal} handleLogOut={handleLogOut}/>
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
