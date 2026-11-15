CREATE TABLE IF NOT EXISTS signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  apps TEXT,
  beta_interest TEXT,
  created_at TEXT
);
