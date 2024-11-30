import React from 'react';

function ComicsList({ comics, user, favorites, onComicSelect, onToggleFavorite }) {
  return (
    <div className="comics-grid">
      {comics.map((comic) => (
        <div
          key={comic.id}
          className="comic-card"
          onClick={() => onComicSelect(comic)}
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
                onToggleFavorite(comic.id);
              }}
            >
              {favorites.includes(comic.id) ? "❤️" : "🤍"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ComicsList;