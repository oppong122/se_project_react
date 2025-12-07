import { useContext } from "react";
import currentUserContext from "../../context/currentUserContext";

import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  onCardClick,
  clothingItems,
  onAddClick,
  isLoggedIn,
  onCardLike,
}) {
  const currentUser = useContext(currentUserContext);
  const userItems = clothingItems.filter((item) => {
    const owner = typeof item.owner === "object" ? item.owner?._id : item.owner;
    return owner === currentUser?._id;
  });

  return (
    <div className="cloth-section">
      <div className="cloth-item__container">
        <p className="coth-section__item">Your Items</p>
        <button className="coth-section__button" onClick={onAddClick}>
          + Add New
        </button>
      </div>
      <ul className="card__list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              isLoggedIn={isLoggedIn}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
