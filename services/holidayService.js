import axios from 'axios';
import dayjs from 'dayjs';
import { getWeekendDates, getConsecutiveDays } from '../utils/dateUtils.js';

export const fetchHolidays = async (countryCode, year) => {
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
  const response = await axios.get(url);
  return response.data.map(h => ({
    date: h.date,
    localName: h.localName
  }));
};

export const getLongWeekends = async (countryCode) => {
  const year = dayjs().year();
  const holidays = await fetchHolidays(countryCode, year);
  const weekends = getWeekendDates(year);

  const allNonWorking = [...new Set([...weekends, ...holidays.map(h => h.date)])];
  const groups = getConsecutiveDays(allNonWorking);

  return groups.map(group => ({
    start_date: group[0].format('YYYY-MM-DD'),
    end_date: group[group.length - 1].format('YYYY-MM-DD'),
    days: group.length,
    holiday: holidays.find(h => h.date === group[0].format('YYYY-MM-DD'))?.localName || null
  }));
};

export const getNextLongWeekend = async (countryCode) => {
  const all = await getLongWeekends(countryCode);
  const today = dayjs();
  return all.find(w => dayjs(w.start_date).isAfter(today)) || null;
};
