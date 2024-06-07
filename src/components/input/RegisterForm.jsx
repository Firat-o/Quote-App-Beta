// RegisterForm.jsx
import React, { useState } from "react";

const RegisterForm = ({ onSubmit }) => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password); // Pass email and password to onSubmit function
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        className="form-container" // Add form-container class
        type="email"
        placeholder="real or fake email ;)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-container" // Add form-container class
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
