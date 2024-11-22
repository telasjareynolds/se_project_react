import "./ItemCard.css";
import liked_btn from "../../assets/liked_btn.svg";
import unliked_btn from "../../assets/unliked_btn.svg";

function ItemCard({ item, openPreviewImageModal, onCardLike }) {
  const openPreviewClick = () => {
    openPreviewImageModal(item);
  };

  const handleLike = () => {
    console.log(item);
    onCardLike(item);
  };

  return (
    <li className="card">
      <div className="card__name-container">
        <p className="card__name">{item.name} </p>
        {item.isLiked ? (
          <img
            src={liked}
            alt="Like button active"
            className="card__like-btn" onClick={handleLike}
          />
        ) : (
          <img
            src={unliked_btn}
            alt="Like button inactive"
            className="card__like-btn"
            onClick={handleLike}
          />
        )}
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
