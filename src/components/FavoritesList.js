import React from "react";

const FavoritesList = ({
  comics,
  favorites,
  user,
  onComicSelect,
  onToggleFavorite,
}) => {
  if (!user || favorites.length === 0) return null;

  const favoriteComics = comics.filter((comic) => favorites.includes(comic.id));

  return (
    <div className="mb-6 p-6 bg-gradient-to-br from-red-100 to-red-50 rounded-xl shadow-lg m-8">
      <h2 className="text-2xl font-bold mb-6 text-red-600">Your Favorites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {favoriteComics.map(comic => (
  <div 
    key={comic.id} 
    className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
    onClick={() => onComicSelect(comic)}  
  >
    <div className="aspect-[2/3]">
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
        className="w-full h-full object-cover"
        
      />
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <h3 className="p-3 text-sm font-medium text-white">{comic.title}</h3>
      </div>
    </div>
    <button
      className={`absolute top-2 right-2 p-2 rounded-full shadow-lg backdrop-blur-md transition-all
        ${favorites.includes(comic.id) ? 'bg-red-600/90 text-white' : 'bg-white/90 text-gray-600'}
        hover:scale-110`}
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite(comic.id);
      }}
    >
      ❤️
    </button>
  </div>
))}
</div>

    </div>
  );
};

export default FavoritesList;
