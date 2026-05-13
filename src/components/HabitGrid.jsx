import React from 'react';
import HabitRow from './HabitRow';
import { getCurrentWeekDays, getPreviousWeekDays, format } from '../utils/dateUtils';
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';

// Count total completions across all habits for a set of days
function countCompletions(habits, completions, days) {
  return days.reduce((acc, day) => {
    const dayStr = format(day, 'yyyy-MM-dd');
    habits.forEach(h => {
      if (completions[h.id] && completions[h.id].includes(dayStr)) acc++;
    });
    return acc;
  }, 0);
}

// Check if any habit has data from a previous week (i.e., has been tracked long enough)
function hasPreviousWeekData(habits, completions, prevWeekDays) {
  const prevDayStrs = prevWeekDays.map(d => format(d, 'yyyy-MM-dd'));
  return habits.some(h =>
    (completions[h.id] || []).some(d => prevDayStrs.includes(d))
  );
}

const HabitGrid = ({ habits, completions, toggleHabitCompletion }) => {
  const weekDays = getCurrentWeekDays();
  const prevWeekDays = getPreviousWeekDays();
  const startDate = weekDays[0];
  const endDate = weekDays[weekDays.length - 1];

  // This week stats
  const thisWeekCount = countCompletions(habits, completions, weekDays);
  const totalPossible = habits.length * 7;
  const percentage = totalPossible === 0 ? 0 : Math.round((thisWeekCount / totalPossible) * 100);

  // Last week stats
  const lastWeekCount = countCompletions(habits, completions, prevWeekDays);
  const hasLastWeek = hasPreviousWeekData(habits, completions, prevWeekDays);

  // Week-over-week badge logic
  let badge;
  if (habits.length === 0) {
    badge = null;
  } else if (!hasLastWeek) {
    // New — no previous week data yet
    badge = (
      <div className="flex items-center gap-2 text-sky-500 bg-sky-50 dark:bg-sky-500/10 px-3 py-1.5 rounded-lg mb-2">
        <Clock size={16} />
        <span className="text-sm font-medium">In Progress — check back next week</span>
      </div>
    );
  } else {
    const lastWeekTotal = habits.length * 7;
    const lastWeekPct = lastWeekTotal === 0 ? 0 : Math.round((lastWeekCount / lastWeekTotal) * 100);
    const diff = percentage - lastWeekPct;

    if (diff > 0) {
      badge = (
        <div className="flex items-center gap-2 text-green-500 bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-lg mb-2">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">Up {diff}% from last week</span>
        </div>
      );
    } else if (diff < 0) {
      badge = (
        <div className="flex items-center gap-2 text-red-400 bg-red-50 dark:bg-red-500/10 px-3 py-1.5 rounded-lg mb-2">
          <TrendingDown size={16} />
          <span className="text-sm font-medium">Down {Math.abs(diff)}% from last week</span>
        </div>
      );
    } else {
      badge = (
        <div className="flex items-center gap-2 text-slate-500 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg mb-2">
          <Minus size={16} />
          <span className="text-sm font-medium">Same as last week</span>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Weekly Overview</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
          </p>
        </div>

        <div className="text-right">
          {badge}
          <div className="w-48 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">{percentage}% achieved</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header Row */}
          <div className="grid grid-cols-[200px_1fr] gap-4 mb-4">
            <div className="text-sm font-medium text-slate-400">Habit</div>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map(day => (
                <div key={day.toString()} className="text-center text-sm font-medium text-slate-400">
                  {format(day, 'EEE')}
                </div>
              ))}
            </div>
          </div>

          {/* Habit Rows */}
          <div className="space-y-3">
            {habits.length === 0 ? (
              <div className="text-center py-10 text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                No habits added yet. Click "Add Habit" to start.
              </div>
            ) : (
              habits.map(habit => (
                <HabitRow
                  key={habit.id}
                  habit={habit}
                  weekDays={weekDays}
                  completions={completions[habit.id] || []}
                  toggleCompletion={toggleHabitCompletion}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitGrid;

