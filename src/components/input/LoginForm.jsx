// src/components/input/LoginForm.jsx
import React, { useState } from "react";

const LoginForm = ({ onSubmit, errorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="form-container"> {/* Wrapper für konsistentes Layout */}
      <form onSubmit={handleSubmit} noValidate>
        <h2>Login</h2>

        {errorMessage && (
          <p className="error" role="alert" aria-live="polite">
            {errorMessage}
          </p>
        )}

        <label htmlFor="email">E-Mail</label>
        <input
          id="email"
          type="email"
          placeholder="name@beispiel.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />

        <label htmlFor="password">Passwort</label>
        <input
          id="password"
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
