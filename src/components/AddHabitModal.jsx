import React, { useState } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const colors = [
  { id: 'blue', hex: 'bg-habit-blue' },
  { id: 'purple', hex: 'bg-habit-purple' },
  { id: 'pink', hex: 'bg-habit-pink' },
  { id: 'green', hex: 'bg-habit-green' },
  { id: 'orange', hex: 'bg-habit-orange' },
];

const emojis = ['💧', '🏃‍♂️', '📚', '🧘‍♀️', '🍎', '💻', '🎸', '🛌', '📝', '🥗'];

const AddHabitModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(emojis[0]);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [goal, setGoal] = useState(7);
  const [unit, setUnit] = useState('');
  const [unitGoal, setUnitGoal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      emoji: selectedEmoji,
      color: selectedColor,
      goal: Number(goal),
      unit: unit.trim() || null,
      unitGoal: unit.trim() && unitGoal ? Number(unitGoal) : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md p-6 shadow-xl border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Habit</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Drink Water"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border-none outline-none focus:ring-2 focus:ring-habit-blue text-slate-900 dark:text-white placeholder:text-slate-400"
              autoFocus
            />
          </div>

          {/* Emoji */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Icon
            </label>
            <div className="flex gap-2 flex-wrap">
              {emojis.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={twMerge(
                    clsx(
                      'w-12 h-12 rounded-xl text-xl flex items-center justify-center transition-all',
                      selectedEmoji === emoji
                        ? 'bg-slate-200 dark:bg-slate-700 scale-110 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                    )
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Color Theme
            </label>
            <div className="flex gap-3">
              {colors.map(color => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color.id)}
                  className={twMerge(
                    clsx(
                      'w-10 h-10 rounded-full transition-all flex items-center justify-center',
                      color.hex,
                      selectedColor === color.id ? 'ring-4 ring-offset-2 ring-slate-200 dark:ring-slate-700 scale-110' : ''
                    )
                  )}
                />
              ))}
            </div>
          </div>

          {/* Unit tracking (optional) */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 space-y-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              📊 Track quantity <span className="font-normal text-slate-400">(optional)</span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  Unit label
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="liters, km, pages…"
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-habit-blue text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  Daily goal
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={unitGoal}
                  onChange={(e) => setUnitGoal(e.target.value)}
                  placeholder={unit ? `e.g. 2 ${unit}` : 'e.g. 2'}
                  disabled={!unit.trim()}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-habit-blue text-sm text-slate-900 dark:text-white placeholder:text-slate-400 disabled:opacity-40"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/20 active:scale-[0.98]"
          >
            Save Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;
