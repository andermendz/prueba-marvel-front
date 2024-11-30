import React from 'react';

function ComicsList({ comics, user, favorites, onComicSelect, onToggleFavorite }) {
  return (

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6 bg-gray-50">
  {comics.map((comic) => (
    <div
      key={comic.id}
      className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
    >
      <div 
        className="relative aspect-[2/3] cursor-pointer"
        onClick={() => onComicSelect(comic)}
      >
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <h3 className="p-3 text-sm font-medium text-white">{comic.title}</h3>
        </div>
      </div>

      {user && (
   <button
   className={`absolute top-2 right-2 p-2 rounded-full shadow-lg backdrop-blur-md transition-all z-10 ${
     favorites.includes(comic.id)
       ? "bg-red-600/90 text-white hover:bg-red-700/90"
       : "bg-white/90 text-gray-800 hover:bg-gray-200/90"
   } hover:scale-110`}
   onClick={() => onToggleFavorite(comic.id)}
 >
   {favorites.includes(comic.id) ? '❤️' : '🤍'}
 </button>
 
      )}
    </div>
  ))}
</div>


  );
}

export default ComicsList;
