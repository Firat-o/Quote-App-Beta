import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
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
  // auth/loader
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);       // initial app load
  const [authLoading, setAuthLoading] = useState(false); // login/register in-flight
  const [loginError, setLoginError] = useState(null);

  // ui
  const [authView, setAuthView] = useState(null); // 'login' | 'register' | null

  // quotes
  const [username, setUsername] = useState("");
  const [quoteInput, setQuoteInput] = useState("");
  const [quoteAdded, setQuoteAdded] = useState(false);
  const hideQuoteAddedTimer = useRef(null);

  // derived username (e.g. "john" from "john@mail.com")
  const derivedName = useMemo(() => {
    if (!user?.email) return "";
    return user.email.split("@")[0];
  }, [user]);

  // keep username in state for Firestore write (keine breaking changes)
  useEffect(() => {
    setUsername(derivedName);
  }, [derivedName]);

  // auth state subscription (sauber entkoppelt + cleanup)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      setLoginError(null);
      if (u) setAuthView(null); // Forme schließen, wenn eingeloggt
    });
    return () => unsub();
  }, []);

  // forms toggles (fehler zurücksetzen)
  const openRegister = useCallback(() => {
    setAuthView("register");
    setLoginError(null);
  }, []);
  const openLogin = useCallback(() => {
    setAuthView("login");
    setLoginError(null);
  }, []);

  // auth actions
  const handleLogin = useCallback(async (email, password) => {
    setAuthLoading(true);
    setLoginError(null);
    try {
      const { user: u } = await signInWithEmailAndPassword(auth, email, password);
      setUser(u);
      setAuthView(null);
    } catch (error) {
      let msg = "Ein Fehler ist aufgetreten. Bitte versuche es erneut.";
      if (error?.code === "auth/user-not-found" || error?.code === "auth/wrong-password") {
        msg = "Ungültige E-Mail oder Passwort.";
      }
      setLoginError(msg);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const handleRegister = useCallback(async (email, password) => {
    setAuthLoading(true);
    setLoginError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      setUser(cred.user);
      setAuthView(null);
    } catch (error) {
      if (error?.code === "auth/email-already-in-use") {
        setLoginError("Benutzer existiert bereits. Bitte logge dich ein.");
        setAuthView("login");
      } else {
        setLoginError("Registrierung fehlgeschlagen. Bitte erneut versuchen.");
      }
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
    } finally {
      setUser(null);
      setUsername("");
      setAuthView("login");
    }
  }, []);

  // quotes (mit simpler Erfolgsmeldung + Cleanup)
  const addQuote = useCallback(async (quote) => {
    try {
      const quotesCollection = collection(db, "quotes");
      await addDoc(quotesCollection, { text: quote, userId: username });
      setQuoteAdded(true);
      if (hideQuoteAddedTimer.current) clearTimeout(hideQuoteAddedTimer.current);
      hideQuoteAddedTimer.current = setTimeout(() => setQuoteAdded(false), 5000);
    } catch (error) {
      // optional: setLoginError oder Toast
      console.error("Fehler beim Hinzufügen des Zitats: ", error);
    }
  }, [username]);

  useEffect(() => {
    return () => {
      if (hideQuoteAddedTimer.current) clearTimeout(hideQuoteAddedTimer.current);
    };
  }, []);

  const handleCreateQuote = useCallback(() => {
    const trimmed = quoteInput.trim();
    if (!trimmed) return;
    addQuote(trimmed);
    setQuoteInput("");
  }, [quoteInput, addQuote]);

  return (
    <div className="App">
      <Nav
        user={user}
        onLogin={openLogin}
        onRegister={openRegister}
        onLogout={handleLogout}
      />

      {loading ? (
        <span className="loading" aria-busy="true">Initialisiere…</span>
      ) : user ? (
        <>
          <div className="greeting">
            <p>Willkommen, {username || "Gast"}, gönn dir einen Moment Pause.</p>
          </div>

          <Quotes />

          {quoteAdded && (
            <p className="quote-added-message" role="status" aria-live="polite">
              ✅ Zitat gespeichert.
            </p>
          )}

          <div className="quote-input-container">
            <input
              type="text"
              value={quoteInput}
              onChange={(e) => setQuoteInput(e.target.value)}
              className="quote-input"
              placeholder="Dein eigenes Zitat"
              disabled={authLoading}
            />
            <button
              onClick={handleCreateQuote}
              className="add-quote-button"
              disabled={authLoading || !quoteInput.trim()}
            >
              Hinzufügen
            </button>
          </div>
        </>
      ) : (
        <div className="greeting" style={{ color: "#94a3b8", textAlign: "center" }}>
          <p>- Bitte registrieren oder einloggen, um die Quote Machine zu nutzen -</p>
        </div>
      )}

      {authView === "login" && (
        <LoginForm
          onSubmit={handleLogin}
          errorMessage={loginError}
          isLoading={authLoading}
        />
      )}
      {authView === "register" && (
        <RegisterForm
          onSubmit={handleRegister}
          isLoading={authLoading}
        />
      )}
    </div>
  );
}

export default App;
