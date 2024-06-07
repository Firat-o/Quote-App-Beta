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
import Quotes from "./components/extras/RandomQuotes"; // Import the component where quotes are added
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase/init";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [username, setUsername] = useState(""); // State to store the user ID
  const [quoteInput, setQuoteInput] = useState(""); // State for quote input
  const [quoteAdded, setQuoteAdded] = useState(false); // State to track if quote is added

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setUser(user);
      setUsername(user ? user.email.split("@")[0] : ""); // Set username to email without domain part
    });
  }, []);

  function register() {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  }

  function login() {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  }

  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser(user);
        setLoginError(null);
        setShowLoginForm(false);
        setShowRegisterForm(false);
      })
      .catch((error) => {
        console.log(error.message);
        let errorMessage =
          "An error occurred. Please try again with different email or password.";
        switch (error.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
            errorMessage = "Invalid email or password. Please try again.";
            break;
          default:
            break;
        }
        setLoginError(errorMessage);
      });
  };

  const handleRegister = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setShowLoginForm(false);
        setShowRegisterForm(false);
      })
      .catch((error) => {
        console.log(error);
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
      await addDoc(quotesCollection, { text: quote, userId: username }); // Include userId field with username
      console.log("Quote added successfully!");
      setQuoteAdded(true); // Set quoteAdded to true after successful addition
    } catch (error) {
      console.error("Error adding quote: ", error);
    }
  };

  const handleCreateQuote = () => {
    addQuote(quoteInput);
    setQuoteInput(""); // Clear the input field after adding the quote
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
        <span className="loading">loading...</span>
      ) : user ? (
        <>
          <div className="greeting">
            <p>
              Welcome, {username}, take a moment and
              rest.
            </p>
          </div>
          <Quotes />
          {quoteAdded && <p className="quote-added-message">Quote added successfully! Refresh Page!</p>}
          <div className="quote-input-container">
            <input
              type="text"
              value={quoteInput}
              onChange={(e) => setQuoteInput(e.target.value)}
              className="quote-input"
              placeholder="Enter own quote"
            />
            <button onClick={handleCreateQuote} className="add-quote-button">Add Quote</button>
          </div>
        </>
      ) : (
        <div className="greeting">
          <p>-Register to use the quote machine-</p>
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
