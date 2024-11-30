import React, { useState, useEffect } from 'react';
import './App.css';

// todo - gestion favoritos
function App() {
  const [comics, setComics] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '' });
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    fetchComics();
    const token = localStorage.getItem('token');
    if (token) {
      fetchFavorites();
    }
  }, []);

  const fetchComics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/comics');
      const data = await response.json();
      setComics(data);
    } catch (error) {
      console.error('Error fetching comics:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/favorites', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setUser(true);
        fetchFavorites();
        setShowLogin(false);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Registration data:', registerData); 
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });
      const data = await response.json();
      console.log('Server response:', data); 
      if (response.ok) {
        setShowRegister(false);
        setShowLogin(true);
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setFavorites([]);
  };

  const toggleFavorite = async (comicId) => {
    if (!user) return;

    try {
      if (favorites.includes(comicId)) {
        const response = await fetch(`http://localhost:5000/api/favorites/${comicId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setFavorites(data);
      } else {
        const response = await fetch('http://localhost:5000/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ comicId })
        });
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <div className="app">
      <header>
        <nav>
          <h1>Marvel Comics</h1>
          <div className="auth-buttons">
            {user ? (
              <button className="btn" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <button className="btn" onClick={() => setShowLogin(true)}>Login</button>
                <button className="btn" onClick={() => setShowRegister(true)}>Register</button>
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
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
            <button type="submit">Login</button>
            <button type="button" onClick={() => setShowLogin(false)}>Cancel</button>
          </form>
        </div>
      )}

      {showRegister && (
        <div className="modal">
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
            />
            <button type="submit">Register</button><button type="button" onClick={() => setShowRegister(false)}>Cancel</button>
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
            <p>{selectedComic.description || 'No description available'}</p>
            {user && (
              <button
                className={`favorite-btn ${favorites.includes(selectedComic.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(selectedComic.id)}
              >
                {favorites.includes(selectedComic.id) ? 'Remove from Favorites' : 'Add to Favorites'}
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
                    className={`favorite-btn ${favorites.includes(comic.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(comic.id);
                    }}
                  >
                    {favorites.includes(comic.id) ? '❤️' : '🤍'}
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
