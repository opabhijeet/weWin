import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import 'morgan';
import { getLongWeekends, getNextLongWeekend } from './services/holidayService.js';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Welcome to the Long Weekends API! Use /long-weekends/:countryCode or /next-long-weekend/:countryCode');
});

app.get('/long-weekends/:countryCode', async (req, res) => {
  try {
    const weekends = await getLongWeekends(req.params.countryCode);
    res.json(weekends);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data', detail: err.message });
  }
});

app.get('/next-long-weekend/:countryCode', async (req, res) => {
  try {
    const weekend = await getNextLongWeekend(req.params.countryCode);
    if (weekend) return res.json(weekend);
    res.status(404).json({ message: 'No upcoming long weekend found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
