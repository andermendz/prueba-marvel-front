import React from 'react';

function Header({ user, onLogin, onRegister, onLogout }) {
  return (
    <header>
      <nav>
        <h1>Marvel Comics</h1>
        <div className="auth-buttons">
          {user ? (
            <button className="btn" onClick={onLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="btn" onClick={onLogin}>
                Login
              </button>
              <button className="btn" onClick={onRegister}>
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
