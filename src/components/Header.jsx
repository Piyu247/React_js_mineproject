import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { getDisplayDate } from '../utils/dateUtils';

const Header = ({ userName, isDarkMode, toggleDarkMode }) => {
  const today = new Date();
  const hour = today.getHours();

  let greeting = 'Good evening';
  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
  }

  // Calculate rough hours till bedtime (assuming 10 PM)
  const hoursTillBedtime = Math.max(0, 22 - hour);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {greeting}, {userName || 'there'}
        </h1>
        <div className="flex items-center gap-3 mt-2 text-slate-500 dark:text-slate-400">
          <span className="font-medium">{getDisplayDate(today)}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
          <span>{hoursTillBedtime} hrs till bedtime</span>
        </div>
      </div>

      {/* Dark / Light mode toggle */}
      <button
        id="dark-mode-toggle"
        onClick={toggleDarkMode}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        className="
          flex items-center gap-2 px-4 py-2 rounded-full
          bg-slate-100 dark:bg-slate-700
          hover:bg-slate-200 dark:hover:bg-slate-600
          text-slate-600 dark:text-slate-300
          border border-slate-200 dark:border-slate-600
          transition-all duration-300 hover:scale-105 active:scale-95
          shadow-sm text-sm font-medium select-none
        "
      >
        {isDarkMode ? (
          <>
            <Sun size={16} className="text-yellow-400" />
            <span>Light</span>
          </>
        ) : (
          <>
            <Moon size={16} className="text-indigo-400" />
            <span>Dark</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Header;

