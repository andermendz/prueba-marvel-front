import React, { useState } from 'react';

function ComicDetail({ comic, user, favorites, onBack, onToggleFavorite }) {
  const [showAllCreators, setShowAllCreators] = useState(false);
  const [showAllCharacters, setShowAllCharacters] = useState(false);

  return (
    <div className="comic-detail">
      <button className="back-btn" onClick={onBack}>
        Back to Comics
      </button>

      {user && (
        <button
          className={`favorite-btn ${
            favorites.includes(comic.id) ? "active" : ""
          }`}
          onClick={() => onToggleFavorite(comic.id)}
        >
          {favorites.includes(comic.id)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </button>
      )}
      <h2>{comic.title}</h2>
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
      />

      <div className="comic-info">
        <p>
          <strong>Description:</strong>{" "}
          {comic.description ||
            `This issue of ${comic.series?.name || "this series"} (Issue ${
              comic.issueNumber || "Unknown"
            }) features stories and artwork by top creators.`}
        </p>

        {comic.variantDescription && (
          <p>
            <strong>Variant:</strong> {comic.variantDescription}
          </p>
        )}

        <p>
          <strong>Series:</strong> {comic.series?.name || "Unknown"}
        </p>
        
        <p>
          <strong>Issue Number:</strong> {comic.issueNumber || "N/A"}
        </p>

        <p>
          <strong>Format:</strong> {comic.format || "Unknown"}
        </p>

        <p>
          <strong>Page Count:</strong> {comic.pageCount || "N/A"}
        </p>

        {comic.isbn && (
          <p>
            <strong>ISBN:</strong> {comic.isbn}
          </p>
        )}

        {comic.prices && comic.prices.length > 0 && (
          <p>
            <strong>Price:</strong> 
            {('$ ' + comic.prices[0].price) || " Price not available"}
          </p>
        )}
      </div>

      <div className="details-grid">
        <div className="creators-section">
          {comic.creators && comic.creators.items.length > 0 && (
            <div>
              <strong>Creators:</strong>
              <ul>
                {comic.creators.items
                  .slice(0, showAllCreators ? undefined : 3)
                  .map((creator) => (
                    <li key={creator.resourceURI}>
                      {creator.name} - {creator.role}
                    </li>
                  ))}
              </ul>
              {comic.creators.items.length > 3 && (
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
          {comic.characters && comic.characters.items.length > 0 && (
            <div>
              <strong>Characters:</strong>
              <ul>
                {comic.characters.items
                  .slice(0, showAllCharacters ? undefined : 3)
                  .map((character) => (
                    <li key={character.resourceURI}>
                      {character.name}
                    </li>
                  ))}
              </ul>
              {comic.characters.items.length > 3 && (
                <button
                  className="show-more-btn"
                  onClick={() => setShowAllCharacters(!showAllCharacters)}
                >
                  {showAllCharacters ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComicDetail;
