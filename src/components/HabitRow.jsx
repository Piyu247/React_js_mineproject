import React from 'react';
import { format } from '../utils/dateUtils';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const colorClasses = {
  blue: 'bg-habit-blue text-white shadow-habit-blue/20',
  purple: 'bg-habit-purple text-white shadow-habit-purple/20',
  pink: 'bg-habit-pink text-white shadow-habit-pink/20',
  green: 'bg-habit-green text-white shadow-habit-green/20',
  orange: 'bg-habit-orange text-white shadow-habit-orange/20',
};

const HabitRow = ({ habit, weekDays, completions, toggleCompletion }) => {
  const completedCount = weekDays.filter(day => completions.includes(format(day, 'yyyy-MM-dd'))).length;
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="grid grid-cols-[200px_1fr] gap-4 items-center group">
      <div className="flex items-center gap-3">
        <span className="text-xl bg-slate-100 dark:bg-slate-700 w-10 h-10 rounded-xl flex items-center justify-center">
          {habit.emoji}
        </span>
        <div>
          <h3 className="font-medium text-slate-900 dark:text-white truncate max-w-[120px]">
            {habit.name}
          </h3>
          <p className="text-xs text-slate-500">{completedCount}/7 days</p>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map(day => {
          const dayStr = format(day, 'yyyy-MM-dd');
          const isCompleted = completions.includes(dayStr);
          const isPast = dayStr < todayStr;

          const bgClass = isCompleted
            ? colorClasses[habit.color] || colorClasses.blue
            : isPast
              ? 'bg-slate-100 dark:bg-slate-800 opacity-40'
              : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600';

          return (
            <button
              key={dayStr}
              onClick={() => !isPast && toggleCompletion(habit.id, dayStr)}
              disabled={isPast}
              title={isPast ? 'Cannot edit past days' : ''}
              className={twMerge(
                clsx(
                  "aspect-square rounded-xl transition-all duration-300 w-full shadow-sm",
                  bgClass,
                  isPast
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:scale-105 cursor-pointer'
                )
              )}
              aria-label={`Toggle ${habit.name} on ${dayStr}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HabitRow;

