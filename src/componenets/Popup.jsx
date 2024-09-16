import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Popup = ({ onClose, onAddWebsite }) => {
  const [websiteName, setWebsiteName] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (websiteName && websiteURL) {
      onAddWebsite({ name: websiteName, url: websiteURL });
      setWebsiteName('');
      setWebsiteURL('');
      onClose(); // Close the popup after adding
      navigate("/template");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>×</button>
        <h2>Add Your Website</h2>
        <form onSubmit={handleSubmit}>          
          <label>
            Website Name:
            <input
              type="text"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              required
            />
          </label>
          <label>
            Website URL:
            <input
              type="url"
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Website</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
