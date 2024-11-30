import React from 'react';

function Header({ user, onLogin, onRegister, onLogout }) {
  return (
<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
  <nav className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
    <h1 className="text-3xl font-bold text-red-600 tracking-tight">Marvel Comics</h1>
    <div className="flex gap-4">
      {user ? (
        <button 
          onClick={onLogout}
          className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      ) : (
        <>
          <button 
            onClick={onLogin}
            className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            Login
          </button>
          <button 
            onClick={onRegister}
            className="px-6 py-2.5 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium"
          >
            Register
          </button>
        </>
      )}
    </div>
  </nav>
</header>

  );
}

export default Header;
