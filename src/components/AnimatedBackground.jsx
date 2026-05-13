import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const AnimatedBackground = ({ timeOfDay }) => {
  const themes = {
    morning: {
      bg: 'bg-emerald-50 dark:bg-emerald-950',
      blob1: 'bg-yellow-300 dark:bg-emerald-800',
      blob2: 'bg-emerald-300 dark:bg-teal-800',
      blob3: 'bg-sky-200 dark:bg-sky-900'
    },
    afternoon: {
      bg: 'bg-sky-50 dark:bg-sky-950',
      blob1: 'bg-sky-300 dark:bg-blue-800',
      blob2: 'bg-cyan-200 dark:bg-cyan-800',
      blob3: 'bg-blue-200 dark:bg-indigo-900'
    },
    evening: {
      bg: 'bg-slate-900',
      blob1: 'bg-purple-600',
      blob2: 'bg-indigo-600',
      blob3: 'bg-blue-900'
    }
  };

  const currentTheme = themes[timeOfDay] || themes.afternoon;

  return (
    <div className={twMerge(clsx("fixed inset-0 w-full h-full overflow-hidden transition-colors duration-1000 -z-10", currentTheme.bg))}>
      {/* Blob 1 */}
      <div className={twMerge(clsx(
        "absolute top-0 -left-4 w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-blob transition-colors duration-1000",
        currentTheme.blob1
      ))}></div>
      
      {/* Blob 2 */}
      <div 
        className={twMerge(clsx(
          "absolute top-0 -right-4 w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-blob transition-colors duration-1000",
          currentTheme.blob2
        ))}
        style={{ animationDelay: '2s' }}
      ></div>
      
      {/* Blob 3 */}
      <div 
        className={twMerge(clsx(
          "absolute -bottom-8 left-20 w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-70 animate-blob transition-colors duration-1000",
          currentTheme.blob3
        ))}
        style={{ animationDelay: '4s' }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
