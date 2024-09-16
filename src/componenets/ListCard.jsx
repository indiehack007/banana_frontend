import { useNavigate } from "react-router-dom";


const ListCard = ({ website,idx }) => {
  // console.log(key)
  const navigate=useNavigate();
  const handleCardClick = () => {
    navigate(`/websites/${website._id}`);
  };
    return (
        <div onClick={handleCardClick} className="card">
          <h3>{website.website}</h3>
          <p>Click Here to Edit</p>
        </div>
      );
}

export default ListCard