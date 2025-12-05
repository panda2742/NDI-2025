const rateLimit = require('express-rate-limit');

const WINDOW_MS = Number(process.env.RATE_WINDOW_MS) || 60_000; // 1 minute
const MAX = Number(process.env.RATE_MAX) || 60; // 60 requêtes par IP par window

const limiter = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'rate_limited', message: 'Trop de requêtes, réessayez plus tard.' }
});

module.exports = limiter;