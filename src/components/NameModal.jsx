import React, { useState } from 'react';
import { User } from 'lucide-react';

const NameModal = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-sm p-8 shadow-xl border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mb-4">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome!</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">What should we call you?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 text-center rounded-xl bg-slate-50 dark:bg-slate-900 border-none outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 text-lg font-medium"
              autoFocus
            />
          </div>

          <button 
            type="submit"
            disabled={!name.trim()}
            className="w-full py-4 bg-blue-500 text-white rounded-xl font-bold disabled:opacity-50 transition-all hover:bg-blue-600 active:scale-[0.98] shadow-md shadow-blue-500/20"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;
