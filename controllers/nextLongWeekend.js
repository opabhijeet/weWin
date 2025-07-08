import { success, failure } from '../utils/responseHelper.js';
import { getNextLongWeekend } from '../services/holidayService.js';

export const nextLongWeekend = async (req, res) => {
  try {
    const weekend = await getNextLongWeekend(req.params.countryCode);
    if (weekend) return res.json(success(weekend));
    res.status(404).json(failure('No upcoming long weekend found'));
  } catch (err) {
    console.error(`[Next Long Weekend Error]`, err);
    res.status(500).json(failure('Failed to fetch next long weekend'));
  }
};