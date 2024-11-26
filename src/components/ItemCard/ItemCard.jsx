import "./ItemCard.css";
import liked_btn from "../../assets/liked_btn.svg";
import unliked_btn from "../../assets/unliked_btn.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, openPreviewImageModal, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = !currentUser._id
    ? "card__like-hidden"
    : "card__like-visible";

  const openPreviewClick = () => {
    openPreviewImageModal(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__name-container">
        <p className="card__name">{item.name} </p>
        <img
          src={isLiked ? liked_btn : unliked_btn} // Toggle like button image
          alt={isLiked ? "Liked" : "Not liked"}
          className={itemLikeButtonClassName}
          onClick={handleLike}
        />
      </div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__img"
        onClick={openPreviewClick}
      />
    </li>
  );
}

export default ItemCard;
