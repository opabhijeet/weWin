import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import validateCountryCode from './middlewares/validateCountryCode.js';
import { longWeekends } from './controllers/longWeekends.js';
import { nextLongWeekend } from './controllers/nextLongWeekend.js';
import { limiter } from './middlewares/rateLimiter.js';
import { flushCache } from './middlewares/clearCache.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(limiter);
process.env.DEVELOPMENT === 'true' && app.use(flushCache());
app.use(express.json());

app.get('/long-weekends/:countryCode', validateCountryCode, longWeekends);

app.get('/next-long-weekend/:countryCode', validateCountryCode, nextLongWeekend);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
