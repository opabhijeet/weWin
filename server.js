import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import validateCountryCode from './middlewares/validateCountryCode.js';
import { longWeekends } from './controllers/longWeekends.js';
import { nextLongWeekend } from './controllers/nextLongWeekend.js';
import { limiter } from './middlewares/rateLimiter.js';
import { flushCache } from './middlewares/clearCache.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(limiter);
process.env.DEVELOPMENT === 'true' && app.use(flushCache());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Long Weekends API!</h1>
    <p>Use the following endpoints:</p>
    <ul>
      <li><code>GET /long-weekends/:countryCode</code> - List all long weekends for a country.</li>
      <li><code>GET /next-long-weekend/:countryCode</code> - Get the next upcoming long weekend.</li>
    </ul>
    <p>Replace <code>:countryCode</code> with a valid country code (e.g., US, IN, CA).</p>
  `);
});

app.get('/long-weekends/:countryCode', validateCountryCode, longWeekends);

app.get('/next-long-weekend/:countryCode', validateCountryCode, nextLongWeekend);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
