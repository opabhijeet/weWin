import express from 'express';
import { getLongWeekends, getNextLongWeekend } from './services/holidayService.js';

const app = express();
const PORT = process.env.PORT || 3000;

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
