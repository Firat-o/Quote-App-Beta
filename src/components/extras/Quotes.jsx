// import React, { useState, useEffect } from "react";
// import GifCampfire from "../assets/GifCampfire.gif";

// const Quotes = () => {
//   const quotes = [
//     "Float like a butterfly, sting like a bee. - Muhammad Ali",
//     "I hated every minute of training, but I said, 'Don’t quit. Suffer now and live the rest of your life as a champion.' - Muhammad Ali",
//     "The ultimate aim of martial arts is not having to use them. - Miyamoto Musashi",
//     "In strategy it is important to see distant things as if they were close and to take a distanced view of close things. - Miyamoto Musashi",
//     "The greatest victory is that which requires no battle. - Sun Tzu",
//     "It's not the size of the dog in the fight, it's the size of the fight in the dog. - Mark Twain",
//     "The more you sweat in training, the less you bleed in combat. - Richard Marcinko",
//     "He who conquers himself is the mightiest warrior. - Confucius",
//     "Perseverance, secret of all triumphs. - Victor Hugo",
//     "Fall seven times, stand up eight. - Japanese Proverb",
//     "Victory is reserved for those who are willing to pay its price. - Sun Tzu",
//     "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
//     "A champion is someone who gets up when he can't. - Jack Dempsey",
//     "The way of the warrior is resolute acceptance of death. - Miyamoto Musashi",
//     "A sword is useless in the hands of a coward. - Yip Man",
//     "Adapt what is useful, reject what is useless, and add what is specifically your own. - Bruce Lee",
//     "It does not matter how slowly you go as long as you do not stop. - Confucius",
//     "Courage is not the absence of fear, but the triumph over it. - Nelson Mandela",
//     "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times. - Bruce Lee",
//     "I am not afraid of an army of lions led by a sheep; I am afraid of an army of sheep led by a lion. - Alexander the Great",
//     "A man who has no imagination has no wings. - Muhammad Ali",
//     "Do not pray for an easy life, pray for the strength to endure a difficult one. - Bruce Lee",
//     "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
//     "The more you know, the less you need. - Yip Man",
//     "Success is not in what you have, but who you are. - Bo Bennett",
//     "To be prepared for war is one of the most effective means of preserving peace. - George Washington",
//     "The best fighter is never angry. - Lao Tzu",
//     "The true science of martial arts means practicing them in such a way that they will be useful at any time, and to teach them in such a way that they will be useful in all things. - Miyamoto Musashi",
//     "It's not what happens to you, but how you react to it that matters. - Epictetus",
//     "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh (Alice in Wonderland)",
//     "To conquer oneself is a greater task than conquering others. - Buddha",
//     "Strength does not come from physical capacity. It comes from an indomitable will. - Mahatma Gandhi",
//     "The best revenge is massive success. - Frank Sinatra",
//     "Success is stumbling from failure to failure with no loss of enthusiasm. - Winston Churchill",
//     "He who knows when he can fight and when he cannot will be victorious. - Sun Tzu",
//     "I'm not afraid of dying. I'm afraid of not trying. - Jay-Z",
//     "When the going gets tough, the tough get going. - Joseph P. Kennedy",
//     "The mind is everything. What you think you become. - Buddha",
//     "In the midst of chaos, there is also opportunity. - Sun Tzu",
//     "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
//     "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
//     "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
//     "The only easy day was yesterday. - Navy SEALs",
//     "Success consists of going from failure to failure without loss of enthusiasm. - Winston Churchill",
//     "Action is the foundational key to all success. - Pablo Picasso",
//     "The journey of a thousand miles begins with one step. - Lao Tzu",
//     "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
//     "Do not pray for an easy life, pray for the strength to endure a difficult one. - Bruce Lee",
//     "Be not afraid of greatness. Some are born great, some achieve greatness, and others have greatness thrust upon them. - William Shakespeare",
//     "Without ambition, one starts nothing. Without work, one finishes nothing. The prize will not be sent to you. You have to win it. - Ralph Waldo Emerson",
//     // just add some new ones here if neccessary
//   ];

//   const [quote, setQuote] = useState("");

//   // fetch a random quote
//   const fetchRandomQuote = () => {
//     // random quote from the array
//     const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

//     // Update quote state
//     setQuote(randomQuote);
//   };

//   // Fetch a random quote when the component mounts, but only when logged in.
//   useEffect(() => {
//     fetchRandomQuote();
//   }, []);

//   return (
//     <div className="quote-container">
//       <p className="quote-text">{quote}</p>
//       <button className="generate-button" onClick={fetchRandomQuote}>
//         Generate Quote
//       </button>
//       <img className="gif-image" src={GifCampfire} alt="" />
//     </div>
//   );
// };

// export default Quotes;
