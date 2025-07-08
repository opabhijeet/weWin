import { clearCache } from '../services/holidayService.js';
export const flushCache = (req, res, next) => {
    try {
        clearCache();
        next();
    } catch (err) {
        next(err);
    }
}