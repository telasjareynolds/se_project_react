import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  openPreviewImageModal,
  openAddGarmentModal,
  clothingItems,
  userData
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        {console.log(clothingItems)}
        <SideBar userData={userData}/>
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          openPreviewImageModal={openPreviewImageModal}
          openAddGarmentModal={openAddGarmentModal}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
