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
  const [loading, setLoading] = useState(true); // Für den initialen Ladevorgang der Seite
  const [authLoading, setAuthLoading] = useState(false); // Für Login/Register Aktionen
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
    setAuthLoading(true); // Ladezustand starten
    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser(user);
        setLoginError(null);
        setShowLoginForm(false);
        setShowRegisterForm(false);
      })
      .catch((error) => {
        let errorMessage = "Ein Fehler ist aufgetreten. Bitte versuche es erneut.";
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          errorMessage = "Ungültige E-Mail oder Passwort.";
        }
        setLoginError(errorMessage);
      })
      .finally(() => {
        setAuthLoading(false); // Ladezustand immer beenden
      });
  };

  const handleRegister = (email, password) => {
    setAuthLoading(true); // Ladezustand starten
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setShowLoginForm(false);
        setShowRegisterForm(false);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("Benutzer existiert bereits. Bitte logge dich ein.");
        }
      })
      .finally(() => {
        setAuthLoading(false); // Ladezustand immer beenden
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
      setTimeout(() => setQuoteAdded(false), 5000); // Nachricht nach 5s ausblenden
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
    <div className="App">
      <Nav
        user={user}
        onLogin={login}
        onRegister={register}
        onLogout={handleLogout}
      />

      {loading ? (
        <span className="loading">Initialisiere...</span>
      ) : user ? (
        <>
          <div className="greeting">
            <p>Willkommen, {username}, gönn dir einen Moment Pause.</p>
          </div>

          <Quotes />

          {quoteAdded && (
            <p className="quote-added-message">
              ✅ Zitat wurde gespeichert. Refresh nötig!
            </p>
          )}

          <div className="quote-input-container">
            <input
              type="text"
              value={quoteInput}
              onChange={(e) => setQuoteInput(e.target.value)}
              className="quote-input"
              placeholder="Dein eigenes Zitat"
            />
            <button
              onClick={handleCreateQuote}
              className="add-quote-button"
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
        <LoginForm
          onSubmit={handleLogin}
          errorMessage={loginError}
          isLoading={authLoading} // Prop hier übergeben
        />
      )}
      {showRegisterForm && (
        <RegisterForm
          onSubmit={handleRegister}
          isLoading={authLoading} // Prop hier übergeben
        />
      )}
    </div>
  );
}

export default App;
