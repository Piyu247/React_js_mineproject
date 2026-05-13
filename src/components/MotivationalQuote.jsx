import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const quotes = [
  { text: "Small steps every day lead to big changes over time.", author: "Anonymous" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Motivation gets you started. Habit keeps you going.", author: "Jim Ryun" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  { text: "We are what we repeatedly do. Excellence is not an act, but a habit.", author: "Aristotle" },
  { text: "Your habits will determine your future.", author: "Jack Canfield" },
  { text: "The chains of habit are too light to be felt until they are too heavy to be broken.", author: "Warren Buffett" },
  { text: "A year from now you may wish you had started today.", author: "Karen Lamb" },
  { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
  { text: "It does not matter how slowly you go, as long as you do not stop.", author: "Confucius" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Augusta F. Kantra" },
  { text: "The difference between who you are and who you want to be is what you do.", author: "Anonymous" },
  { text: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear" },
  { text: "You will never always be motivated. You must learn to be disciplined.", author: "Anonymous" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only bad workout is the one that didn't happen.", author: "Anonymous" },
  { text: "Strive for progress, not perfection.", author: "Anonymous" },
  { text: "One day or day one — you decide.", author: "Anonymous" },
  { text: "Push yourself because no one else is going to do it for you.", author: "Anonymous" },
  { text: "Great things never come from comfort zones.", author: "Anonymous" },
  { text: "Dream it. Wish it. Do it.", author: "Anonymous" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "Anonymous" },
  { text: "Little by little, a little becomes a lot.", author: "Tanzanian Proverb" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
  { text: "Consistency is what transforms average into excellence.", author: "Anonymous" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The comeback is always stronger than the setback.", author: "Anonymous" },
];

// Deterministic daily pick — same quote all day, changes each new day
function getDailyQuote() {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return quotes[dayOfYear % quotes.length];
}

const MotivationalQuote = () => {
  const [quote, setQuote] = useState(getDailyQuote);
  const [visible, setVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    // Fade in on mount
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleNewQuote = () => {
    setIsSpinning(true);
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote.text === quote.text && quotes.length > 1);
    
    setQuote(newQuote);
    
    // Stop spin animation after a short delay
    setTimeout(() => setIsSpinning(false), 500);
  };

  return (
    <div
      className={`
        transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
    >
      <div className="
        relative overflow-hidden
        bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10
        dark:from-emerald-500/20 dark:via-teal-500/15 dark:to-sky-500/20
        border border-emerald-200/60 dark:border-emerald-700/40
        backdrop-blur-sm rounded-2xl px-6 py-4
        flex items-center gap-4
      ">
        {/* Decorative left accent */}
        <div className="hidden sm:block w-1 self-stretch rounded-full bg-gradient-to-b from-emerald-400 to-teal-500 dark:from-emerald-500 dark:to-teal-400 flex-shrink-0" />

        {/* Quote icon */}
        <span className="text-2xl select-none flex-shrink-0" aria-hidden>💬</span>

        <div className="min-w-0 flex-1 pr-8">
          <p className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
            "{quote.text}"
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            — {quote.author}
          </p>
        </div>
        
        {/* New Quote Button */}
        <button
          onClick={handleNewQuote}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 dark:hover:bg-emerald-400/10 transition-colors z-10"
          title="Get a new quote"
        >
          <RefreshCw size={18} className={`${isSpinning ? 'animate-spin' : ''}`} />
        </button>

        {/* Subtle background decoration */}
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-teal-400/10 dark:bg-teal-400/5 blur-2xl pointer-events-none" />
      </div>
    </div>
  );
};

export default MotivationalQuote;
