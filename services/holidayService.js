import axios from 'axios';
import dayjs from 'dayjs';
import dotenv from 'dotenv';
import { getWeekendDates, getConsecutiveDays } from '../utils/dateUtils.js';

dotenv.config();

const API_KEY = process.env.CALENDARIFIC_API_KEY;
const BASE_URL = 'https://calendarific.com/api/v2/holidays';

const parseCalendarificHolidays = (response) => {
  if (
    !response ||
    !response.data ||
    !response.data.response ||
    !Array.isArray(response.data.response.holidays)
  ) {
    throw new Error('Invalid response structure from Calendarific API');
  }

  return response.data.response.holidays.map(h => ({
    date: h.date.iso,
    localName: h.name
  }));
};

export const fetchHolidays = async (countryCode, year) => {
  try {
    const url = `${BASE_URL}?api_key=${API_KEY}&country=${countryCode}&year=${year}&type=national`;
    const response = await axios.get(url);
    return parseCalendarificHolidays(response);
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error || error.response.statusText;
      throw new Error(`Calendarific API error (${status}): ${message}`);
    } else if (error.request) {
      throw new Error('No response received from Calendarific API');
    } else {
      throw new Error(`Calendarific fetch failed: ${error.message}`);
    }
  }
};

export const getLongWeekends = async (countryCode) => {
  try {
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
  } catch (err) {
    throw new Error(`Failed to compute long weekends: ${err.message}`);
  }
};

export const getNextLongWeekend = async (countryCode) => {
  try {
    const all = await getLongWeekends(countryCode);
    const today = dayjs();
    return all.find(w => dayjs(w.start_date).isAfter(today)) || null;
  } catch (err) {
    throw new Error(`Failed to fetch next long weekend: ${err.message}`);
  }
};
