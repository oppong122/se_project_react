import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  onAddClick,
  onLogout,
  onProfileEdit,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onLogout={onLogout} onProfileEdit={onProfileEdit} />
      </section>
      <section className="profile__clothSection">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddClick={onAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
