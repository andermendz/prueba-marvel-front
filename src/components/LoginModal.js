import React, { useState } from 'react';

function LoginModal({ onClose, onLogin }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default LoginModal;