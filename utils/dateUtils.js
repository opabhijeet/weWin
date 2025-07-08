import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

export const getWeekendDates = (year) => {
  const weekends = [];
  let date = dayjs(`${year}-01-01`);
  while (date.year() === year) {
    if (date.day() === 0 || date.day() === 6) {
      weekends.push(date.format('YYYY-MM-DD'));
    }
    date = date.add(1, 'day');
  }
  return weekends;
};

export const getConsecutiveDays = (nonWorkingDays) => {
  const sorted = nonWorkingDays.map(d => dayjs(d)).sort((a, b) => a - b);
  const result = [];
  let group = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].diff(sorted[i - 1], 'day') === 1) {
      group.push(sorted[i]);
    } else {
      if (group.length >= 3) result.push(group);
      group = [sorted[i]];
    }
  }
  if (group.length >= 3) result.push(group);
  return result;
};
