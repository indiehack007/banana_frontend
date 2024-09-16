import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { contextProvider } from "../App";

const popupLocationOptions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const typeOfFeatureOptions = ["faq", "awareness", "conversion"];

const TemplateForm = ({ urls: propUrls }) => {
  const { websites, setWebsites } = useContext(contextProvider);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const urls = propUrls || state.urls || {};

  const url = urls.url;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://banana-tech.onrender.com/api/v1/template",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      const website = url;
      const { _id } = result;
      const templates = _id;
      const API2 =
        "https://banana-tech.onrender.com/api/v1/user/66e3f9437a574725576cc6e7/websites/templates";
      if (websites.some((site) => site.website === website)) {
        const response2 = await fetch(API2, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            website,
            templates,
          }),
        });
        const webSiteWithArray = websites.find((id) => id.website === website);

        if (!response.ok) {
          throw new Error("Network response was not ok 12");
        }
        console.log(webSiteWithArray);
        setWebsites((prev) => {
          const prevdata = prev;
          const webSiteWithArray = prevdata.find(
            (id) => id.website === website
          );
          const data = webSiteWithArray.templates.push(templates);
          return prevdata;
        });
        alert("Form submitted");
        navigate("/");
      } else {
        const API =
          "https://banana-tech.onrender.com/api/v1/user/66e3f9437a574725576cc6e7/websites";
        const response2 = await fetch(API, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            website,
            templates,
          }),
        });
        
        if (!response.ok) {
          throw new Error("Network response was not ok 12");
        }
        const  {websites}=await response2.json();
        setWebsites((prev)=>{return websites});
        navigate("/");
        alert("Form submitted");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="template-form-container">
      <h2 className="form-title">Create Your Popup Template</h2>
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
        {/* Uncomment this block if you need Stripe API */}
        {/* <div className="form-group">
          <label className="form-label">Stripe API</label>
          <input
            type="text"
            name="stripeApi"
            value={formData.stripeApi}
            onChange={handleChange}
            className="form-input"
          />
        </div> */}
        <div className="form-group">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
      <div className="space"></div>
    </div>
  );
};

export default TemplateForm;
