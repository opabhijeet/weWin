import { success, failure } from '../utils/responseHelper.js';
import { getLongWeekends } from '../services/holidayService.js';

export const longWeekends = async (req, res) => {
  try {
    const weekends = await getLongWeekends(req.params.countryCode);
    res.json(success(weekends));
  } catch (err) {
    console.error(`[Long Weekends Error]`, err);
    res.status(500).json(failure('Failed to fetch long weekends'));
  }
};