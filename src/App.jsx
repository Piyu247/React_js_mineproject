import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Tabs from './components/Tabs';
import HabitGrid from './components/HabitGrid';
import Sidebar from './components/Sidebar';
import Chart from './components/Chart';
import AddHabitModal from './components/AddHabitModal';
import NameModal from './components/NameModal';
import AnimatedBackground from './components/AnimatedBackground';
import MotivationalQuote from './components/MotivationalQuote';
import EditHabitModal from './components/EditHabitModal';
import DailyNotes from './components/DailyNotes';
import { formatDate } from './utils/dateUtils';

function App() {
  const [habits, setHabits] = useLocalStorage('habits', []);
  const [completions, setCompletions] = useLocalStorage('completions', {});
  const [unitLogs, setUnitLogs] = useLocalStorage('unitLogs', {}); // { habitId: { dateStr: number } }
  const [dailyNotes, setDailyNotes] = useLocalStorage('dailyNotes', {}); // { dateStr: { morning: '', afternoon: '', evening: '' } }
  const [userName, setUserName] = useLocalStorage('userName', '');
  const [activeTab, setActiveTab] = useState('Week');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', null); // null = auto

  // Apply dark class whenever isDarkMode or time changes
  useEffect(() => {
    if (isDarkMode === true) {
      document.documentElement.classList.add('dark');
    } else if (isDarkMode === false) {
      document.documentElement.classList.remove('dark');
    }
    // null = auto (time-based)
  }, [isDarkMode]);

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      let current = 'evening';
      if (hour >= 5 && hour < 12) current = 'morning';
      else if (hour >= 12 && hour < 18) current = 'afternoon';

      setTimeOfDay(current);

      // Only apply auto theme if user hasn't manually overridden
      if (isDarkMode === null) {
        if (current === 'evening') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const currentlyDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(!currentlyDark);
  };

  const handleAddHabit = (newHabit) => {
    setHabits([...habits, { ...newHabit, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
    setIsModalOpen(false);
  };

  const handleEditHabit = (updatedHabit) => {
    setHabits(habits.map(h => (h.id === updatedHabit.id ? updatedHabit : h)));
    setEditingHabit(null);
  };

  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter(h => h.id !== habitId));
    
    // Also clean up completions and unitLogs
    setCompletions(prev => {
      const newCompletions = { ...prev };
      delete newCompletions[habitId];
      return newCompletions;
    });
    setUnitLogs(prev => {
      const newUnitLogs = { ...prev };
      delete newUnitLogs[habitId];
      return newUnitLogs;
    });
  };

  const toggleHabitCompletion = (habitId, date) => {
    const dateStr = typeof date === 'string' ? date : formatDate(date);
    setCompletions(prev => {
      const habitCompletions = prev[habitId] || [];
      const isCompleted = habitCompletions.includes(dateStr);
      if (isCompleted) {
        return { ...prev, [habitId]: habitCompletions.filter(d => d !== dateStr) };
      } else {
        return { ...prev, [habitId]: [...habitCompletions, dateStr] };
      }
    });
  };

  const logUnit = (habitId, date, value) => {
    setUnitLogs(prev => ({
      ...prev,
      [habitId]: {
        ...(prev[habitId] || {}),
        [date]: value,
      },
    }));
  };

  const updateDailyNote = (partOfDay, text) => {
    const todayStr = formatDate(new Date());
    setDailyNotes(prev => ({
      ...prev,
      [todayStr]: {
        ...(prev[todayStr] || {}),
        [partOfDay]: text
      }
    }));
  };

  const todayStr = formatDate(new Date());
  const todayNotes = dailyNotes[todayStr] || {};

  return (
    <>
      <AnimatedBackground timeOfDay={timeOfDay} />
      <div className="relative min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
        <Header userName={userName} isDarkMode={document.documentElement.classList.contains('dark')} toggleDarkMode={toggleDarkMode} />

        <div className="mt-5">
          <MotivationalQuote />
        </div>

        <div className="mt-6 mb-6">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} onAddHabit={() => setIsModalOpen(true)} />
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Main Dashboard (Left Side) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-slate-100/50 dark:border-slate-700/50 transition-colors">
            <HabitGrid 
              habits={habits} 
              completions={completions} 
              toggleHabitCompletion={toggleHabitCompletion} 
            />
          </div>
          
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-slate-100/50 dark:border-slate-700/50 transition-colors">
            <Chart habits={habits} completions={completions} />
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-slate-100/50 dark:border-slate-700/50 transition-colors">
            <DailyNotes notes={todayNotes} onNoteChange={updateDailyNote} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-slate-100/50 dark:border-slate-700/50 transition-colors">
          <Sidebar
            habits={habits}
            completions={completions}
            toggleHabitCompletion={toggleHabitCompletion}
            unitLogs={unitLogs}
            logUnit={logUnit}
            onEdit={setEditingHabit}
            onDelete={handleDeleteHabit}
          />
        </div>
      </div>

      {isModalOpen && (
        <AddHabitModal onClose={() => setIsModalOpen(false)} onAdd={handleAddHabit} />
      )}

      {editingHabit && (
        <EditHabitModal
          habit={editingHabit}
          onClose={() => setEditingHabit(null)}
          onSave={handleEditHabit}
        />
      )}

      {!userName && <NameModal onSubmit={setUserName} />}
      </div>
    </>
  );
}

export default App;
