import React, { useState } from "react";

function RegisterModal({ onClose, onRegister, errorMessage }) {
  const [registerData, setRegisterData] = useState({ 
    email: "", 
    password: "", 
    name: "", 
    identification: "" 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(registerData);
    setRegisterData({ 
      email: "", 
      password: "", 
      name: "", 
      identification: "" 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {errorMessage && (
          <div className="text-red-600 text-sm mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="Identification Number"
            value={registerData.identification}
            onChange={(e) => setRegisterData({ ...registerData, identification: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                setRegisterData({ email: "", password: "", name: "", identification: "" });
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lggray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



export default RegisterModal;
