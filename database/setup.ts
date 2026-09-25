import db from "./db";

db.exec(`
  CREATE TABLE IF NOT EXISTS artworks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    year INTEGER,
    location TEXT,
    description TEXT
  )
`);

console.log("Artworks table created!");