import React, { useState, useRef, useEffect } from 'react';
import { Check, Flame, X, ChevronDown, ChevronUp, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import UnitMiniChart from './UnitMiniChart';

const bgClasses = {
  blue:   'bg-gradient-to-r from-habit-blue/20 to-habit-blue/5 border-habit-blue/20',
  purple: 'bg-gradient-to-r from-habit-purple/20 to-habit-purple/5 border-habit-purple/20',
  pink:   'bg-gradient-to-r from-habit-pink/20 to-habit-pink/5 border-habit-pink/20',
  green:  'bg-gradient-to-r from-habit-green/20 to-habit-green/5 border-habit-green/20',
  orange: 'bg-gradient-to-r from-habit-orange/20 to-habit-orange/5 border-habit-orange/20',
};

const dotClasses = {
  blue:   'bg-habit-blue',
  purple: 'bg-habit-purple',
  pink:   'bg-habit-pink',
  green:  'bg-habit-green',
  orange: 'bg-habit-orange',
};

const textClasses = {
  blue:   'text-habit-blue',
  purple: 'text-habit-purple',
  pink:   'text-habit-pink',
  green:  'text-habit-green',
  orange: 'text-habit-orange',
};

const ringClasses = {
  blue:   'focus:ring-habit-blue',
  purple: 'focus:ring-habit-purple',
  pink:   'focus:ring-habit-pink',
  green:  'focus:ring-habit-green',
  orange: 'focus:ring-habit-orange',
};

const HabitCard = ({
  habit,
  isCompleted,
  toggleCompletion,
  unitLogs,
  logUnit,
  todayStr,
  onEdit,
  onDelete,
}) => {
  const [showChart, setShowChart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const habitLogs = unitLogs?.[habit.id] || {};
  const todayValue = habitLogs[todayStr] ?? '';
  const hasUnit = !!habit.unit;

  const progressPct =
    hasUnit && habit.unitGoal && todayValue !== ''
      ? Math.min(100, Math.round((Number(todayValue) / habit.unitGoal) * 100))
      : null;

  const handleUnitChange = (e) => {
    const val = e.target.value;
    if (val === '' || (!isNaN(val) && Number(val) >= 0)) {
      logUnit(habit.id, todayStr, val === '' ? null : Number(val));
    }
  };

  return (
    <div
      className={twMerge(
        clsx(
          'p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
          isCompleted
            ? bgClasses[habit.color] || bgClasses.blue
            : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'
        )
      )}
    >
      {/* Top row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 min-w-0">
          <div className={twMerge(clsx('w-3 h-3 rounded-full flex-shrink-0', dotClasses[habit.color] || dotClasses.blue))} />
          <div className="min-w-0">
            <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2 truncate">
              {habit.emoji} {habit.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1">
                <Flame size={14} className="text-orange-500" />
                {habit.goal || 0} Streak
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className={isCompleted ? (textClasses[habit.color] || textClasses.blue) : ''}>
                {isCompleted ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Expand chart */}
          {hasUnit && (
            <button
              onClick={() => setShowChart(v => !v)}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all hover:scale-105"
              title={showChart ? 'Hide chart' : 'Show weekly chart'}
            >
              {showChart ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          )}

          {/* 3-dot menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all hover:scale-105"
              title="More options"
            >
              <MoreVertical size={15} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-10 z-30 w-36 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => { setMenuOpen(false); onEdit(habit); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Pencil size={14} className="text-slate-400" />
                  Edit
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onDelete(habit.id); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Complete / Undo */}
          <button
            onClick={toggleCompletion}
            className={twMerge(
              clsx(
                'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                isCompleted
                  ? 'bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-900 dark:hover:text-white'
              )
            )}
            aria-label={isCompleted ? 'Undo' : 'Mark Complete'}
          >
            {isCompleted ? <X size={20} /> : <Check size={20} />}
          </button>
        </div>
      </div>

      {/* Unit input + progress bar */}
      {hasUnit && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              step="0.1"
              value={todayValue}
              onChange={handleUnitChange}
              placeholder={`Log ${habit.unit}…`}
              className={twMerge(
                clsx(
                  'flex-1 px-3 py-1.5 rounded-lg text-sm bg-white/70 dark:bg-slate-900/60',
                  'border border-slate-200 dark:border-slate-700',
                  'outline-none focus:ring-2',
                  'text-slate-900 dark:text-white placeholder:text-slate-400',
                  ringClasses[habit.color] || ringClasses.blue
                )
              )}
            />
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              {habit.unit}{habit.unitGoal ? ` / ${habit.unitGoal}` : ''}
            </span>
          </div>

          {progressPct !== null && (
            <div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={twMerge(
                    clsx('h-full rounded-full transition-all duration-500', dotClasses[habit.color] || dotClasses.blue)
                  )}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-right text-[10px] text-slate-400 mt-0.5">{progressPct}% of goal</p>
            </div>
          )}
        </div>
      )}

      {/* Expandable mini chart */}
      {hasUnit && showChart && (
        <UnitMiniChart habit={habit} unitLogs={unitLogs} />
      )}
    </div>
  );
};

export default HabitCard;
