import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import ComicsList from "./components/ComicsList";
import ComicDetail from "./components/ComicDetail";
import FavoritesList from "./components/FavoritesList";
import "./App.css";

function App() {
  const [comics, setComics] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");

  useEffect(() => {
    fetchComics();
    const token = localStorage.getItem("token");
    if (token) {
      fetchFavorites();
      setUser(true);
    }
  }, []);

  const fetchComics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/comics", {
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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

  const handleLogin = async (loginData) => {
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser(true);
        fetchFavorites();
        setShowLogin(false);
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  const handleRegister = async (registerData) => {
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (response.ok) {
        setShowRegister(false);
        setShowLogin(true);
        setLoginSuccessMessage("Account created successfully! Please login.");
        setTimeout(() => {
          setLoginSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("An unexpected error occurred.");
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
      <Header
        user={user}
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
        onLogout={handleLogout}
      />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          errorMessage={errorMessage}
          successMessage={loginSuccessMessage}
        />
      )}

      {showRegister && (
      <RegisterModal
      onClose={() => setShowRegister(false)}
      onRegister={handleRegister}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}  
    />
      )}

      <main>
        {selectedComic ? (
          <ComicDetail
            comic={selectedComic}
            user={user}
            favorites={favorites}
            onBack={() => setSelectedComic(null)}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <>
            <FavoritesList
              comics={comics}
              favorites={favorites}
              user={user}
              onComicSelect={setSelectedComic}
              onToggleFavorite={toggleFavorite}
            />
            <ComicsList
              comics={comics}
              user={user}
              favorites={favorites}
              onComicSelect={setSelectedComic}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
