import React, { useState } from "react";

const RegisterForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    onSubmit(email, password);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} noValidate>
        <h2>Registrieren</h2>

        <label htmlFor="email">E-Mail</label>
        <input
          id="email"
          type="email"
          placeholder="name@beispiel.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          aria-describedby="email-hint"
          disabled={isLoading}
        />
        <p id="email-hint" className="form-hint">
          Es muss <strong>keine echte E-Mail</strong> sein – ein beliebiger
          Wert im Format <code>name@domain</code> reicht völlig aus.
        </p>

        <label htmlFor="password">Passwort</label>
        <div className="password-row">
          <input
            id="password"
            type={showPw ? "text" : "password"}
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
            autoComplete="new-password"
            disabled={isLoading}
          />
          <button
            type="button"
            className="ghost-btn"
            onClick={() => setShowPw((v) => !v)}
            aria-pressed={showPw}
            disabled={isLoading}
          >
            {showPw ? "Verbergen" : "Anzeigen"}
          </button>
        </div>
        <p className="form-hint">
          Tipp: Ein kurzes Passwort reicht – es geht nur um den Zugang.
        </p>

        <button type="submit" disabled={isLoading}>
          {isLoading ? <span className="loader" aria-live="polite" /> : "Registrieren"}
        </button>

        <p className="muted">
          Hinweis: Die Registrierung dient nur der Demo. Es werden keine
          Bestätigungs-E-Mails versendet.
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
