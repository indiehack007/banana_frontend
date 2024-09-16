import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from "./componenets/Card";
import Footer from "./componenets/Footer";
import Header from "./componenets/Header";
import Popup from "./componenets/Popup";
import TemplateForm from "./componenets/TemplateForm";
import ListCard from "./componenets/ListCard";
import WebsiteCards from "./componenets/WebsiteCards";
import UpdateForm from "./componenets/UpdateForm";

export const contextProvider = createContext();

const App = () => {
  const [websites, setWebsites] = useState([]); // State to store the websites
  const [url, setUrl] = useState(); // State to store the websites
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [user, setUser] = useState(null); // State to store user data\

  // Fetch user data from API when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://banana-tech.onrender.com/api/v1/user/66e3f9437a574725576cc6e7"
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data); // Store the user data in the state

          if (data.websites && Array.isArray(data.websites)) {
            setWebsites(data.websites);
          }
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const handleAddWebsite = (web) => {
    setUrl(web);
  };

  return (
    <Router>
      <contextProvider.Provider value={{ websites, setWebsites }}>
        <div>
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/template" element={<TemplateForm urls={url} />} />
              <Route path="/template/:id" element={<UpdateForm />} />
              <Route
                path="/websites/:websiteid"
                element={
                  <WebsiteCards setWebsites={setWebsites} websites={websites} />
                }
              />
              <Route
                path="/"
                element={
                  <>
                    <div className="card-section">
                      {websites.length > 0 ? (
                        websites.map((websiteObj, index) => {
                          return (
                            <ListCard
                              key={index}
                              idx={index}
                              website={websiteObj}
                            />
                          );
                        })
                      ) : (
                        <></>
                      )}
                      <Card onClick={() => setIsPopupVisible(true)} />
                    </div>
                    {isPopupVisible && (
                      <Popup
                        onClose={() => {
                          setIsPopupVisible(false);
                        }}
                        onAddWebsite={handleAddWebsite}
                      />
                    )}
                  </>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </contextProvider.Provider>
    </Router>
  );
};

export default App;
