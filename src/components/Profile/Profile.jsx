import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSections from "../ClothesSections/ClothesSections";

function Profile({ openPreviewImageModal, openAddGarmentModal, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSections
          openPreviewImageModal={openPreviewImageModal}
          openAddGarmentModal={openAddGarmentModal} clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
