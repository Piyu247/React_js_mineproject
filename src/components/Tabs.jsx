import React from 'react';
import { Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Tabs = ({ activeTab, setActiveTab, onAddHabit }) => {
  const tabs = ['Week', 'Month', 'Year', 'All Time'];

  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={twMerge(
              clsx(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                activeTab === tab 
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <button 
        onClick={onAddHabit}
        className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-sm"
      >
        <Plus size={18} />
        Add Habit
      </button>
    </div>
  );
};

export default Tabs;
