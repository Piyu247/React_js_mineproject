import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine,
  ResponsiveContainer, Cell,
} from 'recharts';
import { getCurrentWeekDays, format } from '../utils/dateUtils';

const colorMap = {
  blue:   '#3b82f6',
  purple: '#a855f7',
  pink:   '#ec4899',
  green:  '#22c55e',
  orange: '#f97316',
};

const CustomTooltip = ({ active, payload, habit }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-slate-800 dark:text-white">
          {val} <span className="font-normal text-slate-400">{habit.unit}</span>
        </p>
        {habit.unitGoal && (
          <p className="text-slate-400 mt-0.5">Goal: {habit.unitGoal} {habit.unit}</p>
        )}
      </div>
    );
  }
  return null;
};

const UnitMiniChart = ({ habit, unitLogs }) => {
  if (!habit.unit) return null;

  const weekDays = getCurrentWeekDays();
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const habitLogs = unitLogs[habit.id] || {};
  const color = colorMap[habit.color] || colorMap.blue;

  const data = weekDays.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    return {
      name: format(day, 'EEE'),
      value: habitLogs[dayStr] ?? 0,
      isToday: dayStr === todayStr,
    };
  });

  const maxVal = Math.max(habit.unitGoal || 0, ...data.map(d => d.value), 1);

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-1.5 text-xs text-slate-400">
        <span className="font-medium uppercase tracking-wide">This week ({habit.unit})</span>
        {habit.unitGoal && (
          <span>Goal: {habit.unitGoal} {habit.unit}/day</span>
        )}
      </div>
      <div className="h-[72px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 0, left: -28, bottom: 0 }} barSize={14}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              dy={4}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 9 }}
              allowDecimals={false}
              domain={[0, maxVal]}
              tickCount={3}
            />
            <Tooltip
              cursor={{ fill: 'rgba(148,163,184,0.08)' }}
              content={<CustomTooltip habit={habit} />}
            />
            {habit.unitGoal && (
              <ReferenceLine
                y={habit.unitGoal}
                stroke={color}
                strokeDasharray="4 3"
                strokeOpacity={0.5}
                strokeWidth={1.5}
              />
            )}
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell
                  key={idx}
                  fill={color}
                  fillOpacity={entry.isToday ? 1 : 0.35}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UnitMiniChart;
