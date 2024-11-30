import React, { useState, useEffect } from "react";
import "./App.css";

// todo - gestion favoritos
function App() {
  const [comics, setComics] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ email: "", password: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAllCreators, setShowAllCreators] = useState(false);
  const [showAllCharacters, setShowAllCharacters] = useState(false);

  useEffect(() => {
    fetchComics();
    const token = localStorage.getItem("token");
    if (token) {
      fetchFavorites();
    }
  }, []);

  const fetchComics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/comics");
      const data = await response.json();
      setComics(data);
    } catch (error) {
      console.error("Error fetching comics:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/favorites", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(true);
        fetchFavorites();
        setShowLogin(false);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Registration data:", registerData);
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      console.log("Server response:", data);
      if (response.ok) {
        setShowRegister(false);
        setShowLogin(true);
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setFavorites([]);
  };

  const toggleFavorite = async (comicId) => {
    if (!user) return;

    try {
      if (favorites.includes(comicId)) {
        const response = await fetch(
          `http://localhost:5000/api/favorites/${comicId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setFavorites(data);
      } else {
        const response = await fetch("http://localhost:5000/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ comicId }),
        });
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div className="app">
      <header>
        <nav>
          <h1>Marvel Comics</h1>
          <div className="auth-buttons">
            {user ? (
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <button className="btn" onClick={() => setShowLogin(true)}>
                  Login
                </button>
                <button className="btn" onClick={() => setShowRegister(true)}>
                  Register
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {showLogin && (
        <div className="modal">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <button type="submit">Login</button>
            <button type="button" onClick={() => setShowLogin(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {showRegister && (
        <div className="modal">
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <button type="submit">Register</button>
            <button type="button" onClick={() => setShowRegister(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <main>
        {selectedComic ? (
   <div className="comic-detail">
   <button className="back-btn" onClick={() => setSelectedComic(null)}>
     Back to Comics
   </button>
   <h2>{selectedComic.title}</h2>
   <img
     src={`${selectedComic.thumbnail.path}.${selectedComic.thumbnail.extension}`}
     alt={selectedComic.title}
   />
   
   {/* Add new details section */}
   <div className="comic-info">
     <p>
       <strong>Description:</strong>{" "}
       {selectedComic.description ||
         `This issue of ${selectedComic.series?.name || "this series"} (Issue ${
           selectedComic.issueNumber || "Unknown"
         }) features stories and artwork by top creators.`}
     </p>
 
     {selectedComic.variantDescription && (
       <p>
         <strong>Variant:</strong> {selectedComic.variantDescription}
       </p>
     )}
 
     <p>
       <strong>Series:</strong> {selectedComic.series?.name || "Unknown"}
     </p>
     
     <p>
       <strong>Issue Number:</strong> {selectedComic.issueNumber || "N/A"}
     </p>
 
     <p>
       <strong>Format:</strong> {selectedComic.format || "Unknown"}
     </p>
 
     <p>
       <strong>Page Count:</strong> {selectedComic.pageCount || "N/A"}
     </p>
 
     {selectedComic.isbn && (
       <p>
         <strong>ISBN:</strong> {selectedComic.isbn}
       </p>
     )}
 
     {selectedComic.prices && selectedComic.prices.length > 0 && (
       <p>
         <strong>Price:</strong> 
         {( '$ ' + selectedComic.prices[0].price ) || " Price not available"}
       </p>
     )}
 
  
   </div>
 


            <div className="details-grid">
              <div className="creators-section">
                {selectedComic.creators &&
                  selectedComic.creators.items.length > 0 && (
                    <div>
                      <strong>Creators:</strong>
                      <ul>
                        {selectedComic.creators.items
                          .slice(0, showAllCreators ? undefined : 3)
                          .map((creator) => (
                            <li key={creator.resourceURI}>
                              {creator.name} - {creator.role}
                            </li>
                          ))}
                      </ul>
                      {selectedComic.creators.items.length > 3 && (
                        <button
                          className="show-more-btn"
                          onClick={() => setShowAllCreators(!showAllCreators)}
                        >
                          {showAllCreators ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  )}
              </div>

              <div className="characters-section">
                {selectedComic.characters &&
                  selectedComic.characters.items.length > 0 && (
                    <div>
                      <strong>Characters:</strong>
                      <ul>
                        {selectedComic.characters.items
                          .slice(0, showAllCharacters ? undefined : 3)
                          .map((character) => (
                            <li key={character.resourceURI}>
                              {character.name}
                            </li>
                          ))}
                      </ul>
                      {selectedComic.characters.items.length > 3 && (
                        <button
                          className="show-more-btn"
                          onClick={() =>
                            setShowAllCharacters(!showAllCharacters)
                          }
                        >
                          {showAllCharacters ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  )}
              </div>
            </div>

            {user && (
              <button
                className={`favorite-btn ${
                  favorites.includes(selectedComic.id) ? "active" : ""
                }`}
                onClick={() => toggleFavorite(selectedComic.id)}
              >
                {favorites.includes(selectedComic.id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            )}
          </div>
        ) : (
          <div className="comics-grid">
            {comics.map((comic) => (
              <div
                key={comic.id}
                className="comic-card"
                onClick={() => setSelectedComic(comic)}
              >
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <h3>{comic.title}</h3>
                {user && (
                  <button
                    className={`favorite-btn ${
                      favorites.includes(comic.id) ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(comic.id);
                    }}
                  >
                    {favorites.includes(comic.id) ? "❤️" : "🤍"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
