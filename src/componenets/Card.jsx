
// eslint-disable-next-line react/prop-types
const Card = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card"
    >
      <div className="plus-sign">+</div>
      <p >Add your website</p>
    </div>
  );
};

export default Card;
