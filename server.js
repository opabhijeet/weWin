import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getLongWeekends, getNextLongWeekend, clearCache } from './services/holidayService.js';
import validateCountryCode from './middlewares/validateCountryCode.js';
import { success, failure } from './utils/responseHelper.js';
import { limiter } from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(limiter);
process.env.DEVELOPMENT === 'true' && clearCache();
app.use(express.json());

app.get('/long-weekends/:countryCode', validateCountryCode, async (req, res) => {
  try {
    const weekends = await getLongWeekends(req.params.countryCode);
    res.json(success(weekends));
  } catch (err) {
    console.error(`[Long Weekends Error]`, err);
    res.status(500).json(failure('Failed to fetch long weekends'));
  }
});

app.get('/next-long-weekend/:countryCode', validateCountryCode, async (req, res) => {
  try {
    const weekend = await getNextLongWeekend(req.params.countryCode);
    if (weekend) return res.json(success(weekend));
    res.status(404).json(failure('No upcoming long weekend found'));
  } catch (err) {
    console.error(`[Next Long Weekend Error]`, err);
    res.status(500).json(failure('Failed to fetch next long weekend'));
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
