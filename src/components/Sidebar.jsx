import React from 'react';
import HabitCard from './HabitCard';
import { format } from '../utils/dateUtils';

const Sidebar = ({ habits, completions, toggleHabitCompletion, unitLogs, logUnit, onEdit, onDelete }) => {
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Today's Habits</h2>
        <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
          {habits.length} total
        </span>
      </div>

      <div className="space-y-4 flex-1">
        {habits.length === 0 ? (
          <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
            No habits to show for today.
          </div>
        ) : (
          habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCompleted={completions[habit.id]?.includes(todayStr)}
              toggleCompletion={() => toggleHabitCompletion(habit.id, todayStr)}
              unitLogs={unitLogs}
              logUnit={logUnit}
              todayStr={todayStr}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
