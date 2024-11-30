import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [comics, setComics] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);

  useEffect(() => {
    fetchComics();
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

  const fetchComicDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comics/${id}`);
      const data = await response.json();
      setSelectedComic(data);
    } catch (error) {
      console.error('Error fetching comic details:', error);
    }
  };

  return (
    <div className="app">
      <header>
        <nav>
          <h1>Marvel Comics</h1>
          <div className="auth-buttons">
            <button className="btn">Login</button>
            <button className="btn">Register</button>
          </div>
        </nav>
      </header>

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
          </div>
        ) : (
          <div className="comics-grid">
            {comics.map((comic) => (
              <div
                key={comic.id}
                className="comic-card"
                onClick={() => fetchComicDetails(comic.id)}
              >
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <h3>{comic.title}</h3>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
