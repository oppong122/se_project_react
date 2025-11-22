import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import likeIncative from "../../assets/likeButton.svg";
import likeActive from "../../assets/likeButtonActive.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = Array.isArray(item.likes)
    ? item.likes.some((id) => id === currentUser?._id)
    : false;

  const itemLikeBtnClassName = `card__like ${
    isLiked ? "card__like-active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.preventDefault();
    onCardLike && onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name} </h2>
        <button
          type="button"
          className={itemLikeBtnClassName}
          aria-pressed={isLiked}
          onClick={handleLike}
        >
          <img
            className="like_button"
            src={isLiked ? likeActive : likeIncative}
            alt="like button"
          />
        </button>
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
