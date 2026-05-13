import React from 'react';
import { Sun, Sunset, Moon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

const partsOfDay = [
  { id: 'morning', label: 'Morning', icon: Sun, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  { id: 'afternoon', label: 'Afternoon', icon: Sunset, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
  { id: 'evening', label: 'Evening', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
];

const DailyNotes = ({ notes = {}, onNoteChange }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Daily Reflection</h2>
      <div className="space-y-4">
        {partsOfDay.map((part) => {
          const Icon = part.icon;
          return (
            <div key={part.id} className="group relative">
              <div className={twMerge(clsx("absolute top-3 left-3 p-1.5 rounded-lg", part.bg, part.color))}>
                <Icon size={16} />
              </div>
              <textarea
                value={notes[part.id] || ''}
                onChange={(e) => onNoteChange(part.id, e.target.value)}
                placeholder={`What did you accomplish this ${part.id}?`}
                className="w-full min-h-[100px] pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 focus:bg-white dark:focus:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 resize-none transition-all"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyNotes;
