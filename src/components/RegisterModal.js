import React, { useState } from 'react';

function RegisterModal({ onClose, onRegister }) {
  const [registerData, setRegisterData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(registerData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
        />
        <button type="submit">Register</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default RegisterModal;

