import { useNavigate, useParams } from "react-router-dom";
import WebsiteCard from "./WebsiteCard";
import Card from "./Card";
import { useContext, useState, useEffect } from "react";
import { contextProvider } from "../App";

const WebsiteCards = () => {
  const { websiteid } = useParams();
  console.log(websiteid)
  const { websites, setWebsites } = useContext(contextProvider);
  const [loading, setLoading] = useState(false); // Manage loading state
  const [website, setWebsite] = useState(null); // Store individual website
  const navigate = useNavigate();
  const [ID, setID] = useState(websiteid);

  useEffect(() => {
    const websiteData = websites.find((site) => site._id === websiteid);
    setWebsite(websiteData); // Set the website data once found
  }, [websites, websiteid]);

  const handleClickCard = () => {
    navigate("/template", {
      state: { urls: { url: website.website } },
    });
  };

  const handleDelete = async () => {
    setLoading(true); // Start loading before fetch

    try {
      const response = await fetch(
        `https://banana-tech.onrender.com/api/v1/user/66e3f9437a574725576cc6e7/websites/${websiteid}`,
        {
          method: "DELETE",
        }
      );


      if (response.ok) {
        const updatedWebsites = websites.filter(
          (site) => site._id !== websiteid
        );
        setWebsites(updatedWebsites);
        navigate("/");
      } else {
        throw new Error("Failed to delete the website");
      }
    } catch (error) {
      console.error("Error deleting the website:", error);
      alert("Failed to delete the website");
    } finally {
      setLoading(false); // Stop loading after fetch is complete
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading message when the fetch is in progress
  }

  return (
    <div style={{ position: "relative" }}>
      {website ? (
        <div className="website-card">
          <button
            onClick={handleDelete}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "red",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Delete Website
          </button>
          {website.templates.length > 0 ? (
            <>
              {website.templates.map((template, index) => (
                <WebsiteCard
                  key={index}
                  idx={index}
                  websiteid={websiteid}
                  setWebsites={setWebsites}
                  template={template}
                />
              ))}
              <Card onClick={handleClickCard} />
            </>
          ) : (
            <p>No templates available</p>
          )}
        </div>
      ) : (
        <p>Website not found</p>
      )}
      {!loading && (
        <div className="card">
          <p> Paste this in your HTML File </p>
          <p>{`<script
  defer
  id="tech_popup"
  userId=${ID}
  src="https://hospital-management-site.vercel.app/script.js"
></script>`}</p>
        </div>
      )}
    </div>
  );
};

export default WebsiteCards;
