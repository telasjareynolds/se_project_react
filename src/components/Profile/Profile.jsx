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
  handleLogOut,
  onCardLike
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
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
