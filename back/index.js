require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./middlewares/rateLimit');
const scoresRouter = require('./routes/scores.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// routes
app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/', scoresRouter);

// 404
app.use((req, res) => res.status(404).json({ error: 'not_found' }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal_error' });
});

// démarrage
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`API leaderboard démarrée sur http://localhost:${PORT} (DB: ${require('./db').dbPath})`);
});
