import "./Card.css";

function Card({ image, name, rate, subscription, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={name} />
      <div className="card-info">
        <h3>{name}</h3>
        <span className="rate">⭐ {rate}</span>
        <p className="subscription">{subscription}</p>
      </div>
    </div>
  );
}

export default Card;