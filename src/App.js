import React, { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Nav from "./components/Nav";
import LoginForm from "./components/input/LoginForm";
import RegisterForm from "./components/input/RegisterForm";
import Quotes from "./components/extras/RandomQuotes";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase/init";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [username, setUsername] = useState("");
  const [quoteInput, setQuoteInput] = useState("");
  const [quoteAdded, setQuoteAdded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setUser(user);
      setUsername(user ? user.email.split("@")[0] : "");
    });
  }, []);

  const register = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const login = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser(user);
        setLoginError(null);
        setShowLoginForm(false);
        setShowRegisterForm(false);
      })
      .catch((error) => {
        let errorMessage =
          "Ein Fehler ist aufgetreten. Bitte versuche es erneut.";
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          errorMessage = "Ungültige E-Mail oder Passwort.";
        }
        setLoginError(errorMessage);
      });
  };

  const handleRegister = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setShowLoginForm(false);
        setShowRegisterForm(false);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("User already exists. Please login instead.");
        }
      });
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    setUsername("");
  };

  const addQuote = async (quote) => {
    try {
      const quotesCollection = collection(db, "quotes");
      await addDoc(quotesCollection, { text: quote, userId: username });
      setQuoteAdded(true);
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Zitats: ", error);
    }
  };

  const handleCreateQuote = () => {
    if (quoteInput.trim() === "") return;
    addQuote(quoteInput);
    setQuoteInput("");
  };

  return (
    <div
      className="App"
      style={{
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(15, 23, 42, 0.7)",
        borderRadius: "10px",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <Nav
        user={user}
        onLogin={login}
        onRegister={register}
        onLogout={handleLogout}
      />

      {loading ? (
        <span className="loading">Lädt...</span>
      ) : user ? (
        <>
          <div
            className="greeting"
            style={{
              marginTop: "20px",
              fontSize: "1.2rem",
              color: "#7dd3fc",
              textAlign: "center",
            }}
          >
            <p>Willkommen, {username}, gönn dir einen Moment Pause.</p>
          </div>

          <Quotes />

          {quoteAdded && (
            <p
              className="quote-added-message"
              style={{
                color: "#38bdf8",
                fontWeight: "bold",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              ✅ Zitat wurde gespeichert. Refresh nötig!
            </p>
          )}

          <div
            className="quote-input-container"
            style={{ marginTop: "20px", display: "flex", gap: "12px" }}
          >
            <input
              type="text"
              value={quoteInput}
              onChange={(e) => setQuoteInput(e.target.value)}
              className="quote-input"
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #334155",
                backgroundColor: "#0f172a",
                color: "#e2e8f0",
              }}
              placeholder="Dein eigenes Zitat"
            />
            <button
              onClick={handleCreateQuote}
              className="add-quote-button"
              style={{
                background: "linear-gradient(135deg, #38bdf8, #3b82f6)",
                color: "#fff",
                borderRadius: "8px",
                padding: "10px 16px",
                fontWeight: "bold",
              }}
            >
              Hinzufügen
            </button>
          </div>
        </>
      ) : (
        <div className="greeting" style={{ color: "#94a3b8", textAlign: "center" }}>
          <p>- Bitte registrieren, um die Quote Machine zu nutzen -</p>
        </div>
      )}

      {showLoginForm && (
        <LoginForm onSubmit={handleLogin} errorMessage={loginError} />
      )}
      {showRegisterForm && <RegisterForm onSubmit={handleRegister} />}
    </div>
  );
}

export default App;
