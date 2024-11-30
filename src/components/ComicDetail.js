import React, { useState } from 'react';

function ComicDetail({ comic, user, favorites, onBack, onToggleFavorite }) {
  const [showAllCreators, setShowAllCreators] = useState(false);
  const [showAllCharacters, setShowAllCharacters] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <button 
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        onClick={onBack}
      >
        Back to Comics
      </button>

      {user && (
        <button
          className={`mb-4 ml-2 px-4 py-2 rounded-lg transition-colors ${
            favorites.includes(comic.id)
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => onToggleFavorite(comic.id)}
        >
          {favorites.includes(comic.id)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </button>
      )}

      <h2 className="text-3xl font-bold mb-6">{comic.title}</h2>
      
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
        className="w-full max-w-sm mx-auto rounded-lg shadow-md mb-6"
      />

      <div className="space-y-4">
        <p className="text-gray-700">
          <span className="font-semibold">Description:</span>{" "}
          {comic.description ||
            `This issue of ${comic.series?.name || "this series"} (Issue ${
              comic.issueNumber || "Unknown"
            }) features stories and artwork by top creators.`}
        </p>

        {comic.variantDescription && (
          <p className="text-gray-700">
            <span className="font-semibold">Variant:</span> {comic.variantDescription}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <p className="text-gray-700">
            <span className="font-semibold">Series:</span> {comic.series?.name || "Unknown"}
          </p>
          
          <p className="text-gray-700">
            <span className="font-semibold">Issue Number:</span> {comic.issueNumber || "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Format:</span> {comic.format || "Unknown"}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Page Count:</span> {comic.pageCount || "N/A"}
          </p>

          {comic.isbn && (
            <p className="text-gray-700">
              <span className="font-semibold">ISBN:</span> {comic.isbn}
            </p>
          )}

          {comic.prices && comic.prices.length > 0 && (
            <p className="text-gray-700">
              <span className="font-semibold">Price:</span> 
              {('$ ' + comic.prices[0].price) || " Price not available"}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            {comic.creators && comic.creators.items.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Creators:</h3>
                <ul className="space-y-1">
                  {comic.creators.items
                    .slice(0, showAllCreators ? undefined : 3)
                    .map((creator) => (
                      <li key={creator.resourceURI} className="text-gray-700">
                        {creator.name} - {creator.role}
                      </li>
                    ))}
                </ul>
                {comic.creators.items.length > 3 && (
                  <button
                    className="mt-2 text-red-600 hover:text-red-700"
                    onClick={() => setShowAllCreators(!showAllCreators)}
                  >
                    {showAllCreators ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            {comic.characters && comic.characters.items.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Characters:</h3>
                <ul className="space-y-1">
                  {comic.characters.items
                    .slice(0, showAllCharacters ? undefined : 3)
                    .map((character) => (
                      <li key={character.resourceURI} className="text-gray-700">
                        {character.name}
                      </li>
                    ))}
                </ul>
                {comic.characters.items.length > 3 && (
                  <button
                    className="mt-2 text-red-600 hover:text-red-700"
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
    </div>
  );
}

export default ComicDetail;
