import { useContext } from "react";
import currentUserContext from "../../context/currentUserContext";
import likeInactive from "../../assets/likeButton.svg";
import likeActive from "../../assets/likeButtonActive.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(currentUserContext);

  const isLiked =
    Array.isArray(item.likes) &&
    item.likes.some((id) => id === currentUser?._id);

  const itemLikeBtnClassName = `card__like ${
    isLiked ? "card__like-active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleCardLike = (e) => {
    e.preventDefault();

    if (!isLoggedIn || !currentUser) {
      return;
    }
    if (onCardLike) {
      onCardLike(item._id, isLiked);
    }
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name} </h2>
        {isLoggedIn && currentUser && (
          <button
            type="button"
            className={itemLikeBtnClassName}
            aria-pressed={isLiked}
            onClick={handleCardLike}
          >
            <img
              className="like_button"
              src={isLiked ? likeActive : likeInactive}
              alt="like button"
            />
          </button>
        )}
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
