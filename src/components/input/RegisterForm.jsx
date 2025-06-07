// src/components/input/RegisterForm.jsx
import React, { useState } from "react";

// 1. Die 'isLoading' Prop hier von App.js empfangen
const RegisterForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verhindern, dass das Formular erneut gesendet wird, während es bereits lädt
    if (isLoading) return;
    onSubmit(email, password);
  };

  return (
    // 2. Die Klasse "form-container" gehört auf ein umgebendes div, nicht auf die Inputs
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Registrieren</h2>
        <input
          // Die Klasse wird hier nicht benötigt, da sie vom Container gestylt wird
          type="email"
          placeholder="deine@email.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          // 4. Eingabefelder während des Ladens deaktivieren
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          // 4. Eingabefelder während des Ladens deaktivieren
          disabled={isLoading}
        />
        {/* 3. Button wird je nach 'isLoading' Zustand angepasst */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="loader"></span> // Zeige Spinner beim Laden
          ) : (
            "Registrieren" // Ansonsten normaler Text
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
