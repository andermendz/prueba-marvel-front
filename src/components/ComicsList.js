import React from 'react';

function ComicsList({ comics, user, favorites, onComicSelect, onToggleFavorite }) {
  return (

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6 bg-gray-50">
  {comics.map((comic) => (
    <div
      key={comic.id}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
      onClick={() => onComicSelect(comic)}
    >
      <div className="relative aspect-[2/3]">
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className="w-full h-full object-cover"
        />
        {user && (
          <button
            className={`absolute top-2 right-2 p-2 rounded-full shadow-lg backdrop-blur-md transition-all ${
              favorites.includes(comic.id)
                ? "bg-red-600/90 text-white"
                : "bg-white/90 text-gray-800"
            } hover:scale-110`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(comic.id);
            }}
          >
            {favorites.includes(comic.id) ? "❤️" : "🤍"}
          </button>
        )}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <h3 className="p-3 text-sm font-medium text-white">{comic.title}</h3>
        </div>
      </div>
    </div>
  ))}
</div>

  );
}

export default ComicsList;
