const express = require('express');
const router = express.Router();
const { validateBody, validateQuery } = require('../middlewares/validation');
const db = require('../db');

// Schemas Ajv
const postScoreSchema = {
  type: 'object',
  required: ['player_name', 'score'],
  additionalProperties: false,
  properties: {
    player_name: { type: 'string', minLength: 1, maxLength: 200 },
    score: { type: 'integer' },
    metadata: { type: ['object', 'null'] }
  }
};

const topQuerySchema = {
  type: 'object',
  properties: {
    limit: { type: 'integer', minimum: 1, maximum: 100 }
  },
  additionalProperties: false
};

const paginatedQuerySchema = {
  type: 'object',
  properties: {
    limit: { type: 'integer', minimum: 1, maximum: 100 },
    offset: { type: 'integer', minimum: 0 }
  },
  additionalProperties: false
};

const rankQuerySchema = {
  type: 'object',
  required: ['player_name'],
  properties: {
    player_name: { type: 'string', minLength: 1 }
  },
  additionalProperties: false
};

// POST /scores
router.post('/scores', validateBody(postScoreSchema), (req, res) => {
  try {
    const { player_name, score, metadata } = req.body;
    const { row, rank } = db.insertAndGetRank(player_name.trim(), score, metadata || null);
    return res.status(201).json({ score: row, rank });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

// GET /scores/top?limit=10
router.get('/scores/top', validateQuery(topQuerySchema), (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const rows = db.getTop(limit);
  res.json({ top: rows });
});

// GET /scores?limit=&offset=
router.get('/scores', validateQuery(paginatedQuerySchema), (req, res) => {
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const rows = db.getPaginated(limit, offset);
  res.json({ items: rows, limit, offset });
});

// GET /scores/rank?player_name=Alice
router.get('/scores/rank', validateQuery(rankQuerySchema), (req, res) => {
  const player_name = req.query.player_name;
  const best = db.getBestScoreByPlayer(player_name);
  if (!best) return res.status(404).json({ error: 'player_not_found' });
  const rank = db.getRankForScore(best.score);
  res.json({ player_name, best_score: best, rank });
});

// GET /health
router.get('/health', (_req, res) => res.json({ status: 'ok' }));

module.exports = router;