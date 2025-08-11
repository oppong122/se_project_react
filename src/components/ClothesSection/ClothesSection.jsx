import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ onCardClick }) {
  return (
    <div className="cloth-section">
      <div className="cloth-item__container">
        <p className="cothe-section__item">Your Items</p>
        <button className="cothe-section__button"> + Add New </button>
      </div>
      <ul className="card__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
