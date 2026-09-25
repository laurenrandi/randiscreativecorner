import db from "./db";

db.exec(`
  ALTER TABLE artworks ADD COLUMN x REAL;
  ALTER TABLE artworks ADD COLUMN y REAL;
`);

console.log("Added x and y columns!");