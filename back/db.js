const path = require('path');
const Database = require('better-sqlite3');
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data.sqlite');

const db = new Database(DB_PATH);

// Création de la table et de l'index
db.exec(`
CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  metadata TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_scores_score ON scores(score DESC);
`);

// Requêtes préparées
const insertStmt = db.prepare(`INSERT INTO scores (player_name, score, metadata, created_at) VALUES (?, ?, ?, ?)`);
const selectByIdStmt = db.prepare(`SELECT * FROM scores WHERE id = ?`);
const topStmt = db.prepare(`SELECT * FROM scores ORDER BY score DESC, created_at ASC LIMIT ?`);
const paginatedStmt = db.prepare(`SELECT * FROM scores ORDER BY score DESC, created_at ASC LIMIT ? OFFSET ?`);
const bestByPlayerStmt = db.prepare(`SELECT * FROM scores WHERE player_name = ? ORDER BY score DESC, created_at ASC LIMIT 1`);
const countGreaterStmt = db.prepare(`SELECT COUNT(*) as cnt FROM scores WHERE score > ?`);

function insertAndGetRank(player_name, score, metadata) {
  const now = new Date().toISOString();
  const metaText = metadata ? JSON.stringify(metadata) : null;

  const insertTx = db.transaction(() => {
    const info = insertStmt.run(player_name, score, metaText, now);
    const row = selectByIdStmt.get(info.lastInsertRowid);
    const cntRow = countGreaterStmt.get(score);
    const rank = cntRow.cnt + 1;
    // parse metadata for return
    if (row && row.metadata) {
      try { row.metadata = JSON.parse(row.metadata); } catch (e) { row.metadata = null; }
    }
    return { row, rank };
  });

  return insertTx();
}

function getTop(limit = 10) {
  const rows = topStmt.all(limit);
  return rows.map(r => ({ ...r, metadata: r.metadata ? JSON.parse(r.metadata) : null }));
}

function getPaginated(limit = 20, offset = 0) {
  const rows = paginatedStmt.all(limit, offset);
  return rows.map(r => ({ ...r, metadata: r.metadata ? JSON.parse(r.metadata) : null }));
}

function getBestScoreByPlayer(player_name) {
  const row = bestByPlayerStmt.get(player_name);
  if (!row) return null;
  return { ...row, metadata: row.metadata ? JSON.parse(row.metadata) : null };
}

function getRankForScore(score) {
  const cntRow = countGreaterStmt.get(score);
  return cntRow.cnt + 1;
}

module.exports = {
  insertAndGetRank,
  getTop,
  getPaginated,
  getBestScoreByPlayer,
  getRankForScore,
  dbPath: DB_PATH,
  rawDb: db
};