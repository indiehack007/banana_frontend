import { useNavigate } from "react-router-dom";

const WebsiteCard = ({ template, idx, websiteid, setWebsite,website }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/template/${template}`, {
      state: { websiteId: websiteid,urls:{url:website}},
    });
  };
  return (
    <div onClick={handleCardClick} className="card">
      <p>Template {idx + 1}</p>
      <p>Click Here to Edit</p>
    </div>
  );
};

export default WebsiteCard;
