import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, subWeeks } from 'date-fns';

export { format, subWeeks };

export function getCurrentWeekDays(date = new Date()) {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Starts on Monday
  const end = endOfWeek(date, { weekStartsOn: 1 });
  
  return eachDayOfInterval({ start, end });
}

export function getPreviousWeekDays(date = new Date()) {
  const prevWeek = subWeeks(date, 1);
  return getCurrentWeekDays(prevWeek);
}

export function formatDate(date) {
  return format(date, 'yyyy-MM-dd');
}

export function getDisplayDate(date) {
  return format(date, 'EEE, MMM d');
}

export function checkIsSameDay(date1, date2) {
  return isSameDay(new Date(date1), new Date(date2));
}
