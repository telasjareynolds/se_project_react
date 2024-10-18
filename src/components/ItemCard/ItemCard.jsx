import "./ItemCard.css";

function ItemCard({ item, openPreviewImageModal }) {
  const openPreviewClick = () => {
    openPreviewImageModal(item);
  }
  return (
    <li className="card">
      <div className="card__name-container">
        <p className="card__name">{item.name} </p>
      </div>
      <img src={item.link} alt={item.name} className="card__img" onClick={openPreviewClick}/>
    </li>
  );
}

export default ItemCard;
