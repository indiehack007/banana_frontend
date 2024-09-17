import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { contextProvider } from "../App";

const popupLocationOptions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const typeOfFeatureOptions = ["faq", "awareness", "conversion"];

const UpdateForm = () => {
  const { setWebsites } = useContext(contextProvider);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mainText: "",
    subText: "",
    popupLocation: "top-right", // Default value
    bgColor: "#ffffff", // Default to white
    mainTextColor: "#000000", // Default to black
    subtextColor: "#000000", // Default to black
    borderColor: "#000000", // Default to black
    triggerEvent: 0,
    disappearTime: 6500,
    linkToRedirect: "",
    imageUrl: "",
    typeOfFeature: "awareness", // Default value
    stripeApi: "",
  });

  const { id } = useParams();
  const templateId = id;
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(id);
      try {
        const response = await fetch(
          `https://banana-tech.onrender.com/api/v1/template/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setApiData(data);

        // Optionally set formData to fetched data if applicable
        setFormData({
          mainText: data.mainText || "",
          subText: data.subText || "",
          popupLocation: data.popupLocation || "top-right",
          bgColor: data.bgColor || "#ffffff",
          mainTextColor: data.mainTextColor || "#000000",
          subtextColor: data.subtextColor || "#000000",
          borderColor: data.borderColor || "#000000",
          triggerEvent: data.triggerEvent || 0,
          disappearTime: data.disappearTime || 6500,
          linkToRedirect: data.linkToRedirect || "",
          imageUrl: data.imageUrl || "",
          typeOfFeature: data.typeOfFeature || "awareness",
          stripeApi: data.stripeApi || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://banana-tech.onrender.com/api/v1/template/${id}`,
        {
          method: "PUT", // Use 'POST' if you're creating a new template instead of updating
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/");
      alert("Form submitted successfully:");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const location = useLocation();
  const handleDelete = async () => {
    const { websiteId } = location.state || {};
    try {
      // Define the API endpoint for deleting the template
      const response = await fetch(
        `https://banana-tech.onrender.com/api/v1/user/66e3f9437a574725576cc6e7/websites/${websiteId}/${templateId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("deleted succesully");
        navigate("/");
        setWebsites((prev) => {
          const prevData = prev;
          const data = prevData.find((i) => i._id === websiteId);
          const template = data.templates.filter((id) => id === templateId);
          data.templates = template;
          return prevData;
        });
      } else {
        throw new Error("Failed to delete the template.");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };
  return (
    <div className="template-form-container">
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: "90px",
          right: "8px",
          backgroundColor: "red",
          color: "white",
          padding: "5px 10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        Delete Template
      </button>
      <h2 className="form-title">Update Popup Template</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Main Text</label>
          <input
            type="text"
            name="mainText"
            value={formData.mainText}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Sub Text</label>
          <input
            type="text"
            name="subText"
            value={formData.subText}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Popup Location</label>
          <select
            name="popupLocation"
            value={formData.popupLocation}
            onChange={handleChange}
            className="form-select"
          >
            {popupLocationOptions.map((option) => (
              <option key={option} value={option}>
                {option.replace(/-/g, " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Background Color</label>
          <input
            type="color"
            name="bgColor"
            value={formData.bgColor}
            onChange={handleChange}
            className="color-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Main Text Color</label>
          <input
            type="color"
            name="mainTextColor"
            value={formData.mainTextColor}
            onChange={handleChange}
            className="color-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Subtext Color</label>
          <input
            type="color"
            name="subtextColor"
            value={formData.subtextColor}
            onChange={handleChange}
            className="color-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Border Color</label>
          <input
            type="color"
            name="borderColor"
            value={formData.borderColor}
            onChange={handleChange}
            className="color-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Trigger Event</label>
          <input
            type="number"
            name="triggerEvent"
            value={formData.triggerEvent}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Disappear Time (ms)</label>
          <input
            type="number"
            name="disappearTime"
            value={formData.disappearTime}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Link to Redirect</label>
          <input
            type="text"
            name="linkToRedirect"
            value={formData.linkToRedirect}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Type of Feature</label>
          <select
            name="typeOfFeature"
            value={formData.typeOfFeature}
            onChange={handleChange}
            className="form-select"
          >
            {typeOfFeatureOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Update
          </button>
        </div>
      </form>
      <div className="space"></div>
    </div>
  );
};

export default UpdateForm;
