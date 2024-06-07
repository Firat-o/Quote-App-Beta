import React, { useState, useEffect } from "react";
import GifCampfire from "../assets/GifCampfire.gif";
import { db, collection, getDocs } from "../../firebase/init";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState("");

  // Function to fetch quotes from Firestore
  const fetchQuotesFromFirestore = async () => {
    try {
      const quotesCollection = collection(db, "quotes");
      const snapshot = await getDocs(quotesCollection);
      const quotesData = snapshot.docs.map((doc) => doc.data().text);
      setQuotes(quotesData);
    } catch (error) {
      console.error("Error fetching quotes from Firestore: ", error);
    }
  };

  // Function to fetch a random quote
  const fetchRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  // Fetch quotes from Firestore when the component mounts
  useEffect(() => {
    fetchQuotesFromFirestore();
  }, []);

  // Fetch a random quote when quotes are fetched from Firestore
  useEffect(() => {
    if (quotes.length > 0) {
      fetchRandomQuote();
    }
  }, [quotes]);

  return (
    <div className="quote-container">
      <p className="quote-text">{quote}</p>
      <button className="generate-button" onClick={fetchRandomQuote}>
        Generate Quote
      </button>
      <img className="gif-image" src={GifCampfire} alt="" />
    </div>
  );
};

export default Quotes;
