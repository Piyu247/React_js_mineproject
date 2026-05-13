import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getCurrentWeekDays, format } from '../utils/dateUtils';

const Chart = ({ habits, completions }) => {
  const weekDays = getCurrentWeekDays();
  
  const data = weekDays.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    let count = 0;
    habits.forEach(h => {
      if (completions[h.id] && completions[h.id].includes(dayStr)) {
        count++;
      }
    });
    
    return {
      name: format(day, 'EEE'),
      completed: count,
      isToday: format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    };
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Activity Graph</h2>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              allowDecimals={false}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="completed" radius={[6, 6, 6, 6]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isToday ? '#3b82f6' : '#cbd5e1'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
