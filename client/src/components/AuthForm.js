import React, { useState } from "react";

const AuthForm = ({ onSubmit, type }) => {
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-sm mx-auto p-6 border rounded mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">
        {type === "login" ? "Login" : "Register"}
      </h2>
      {type === "register" && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="block w-full mb-2 p-2 border"
          onChange={handleChange}
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="block w-full mb-2 p-2 border"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="block w-full mb-4 p-2 border"
        onChange={handleChange}
      />
      <button
        onClick={() => onSubmit(form)}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {type === "login" ? "Login" : "Register"}
      </button>
    </div>
  );
};

export default AuthForm;
