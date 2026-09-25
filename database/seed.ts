import db from "./db";
import fs from "fs";
import path from "path";

const artFolder = path.join(
  process.cwd(),
  "public",
  "assets",
  "museum",
  "art"
);

const files = fs
  .readdirSync(artFolder)
  .filter((file) => file.toLowerCase().endsWith(".jpg"));

const insertArtwork = db.prepare(`
  INSERT INTO artworks (title, image)
  VALUES (?, ?)
`);

for (const file of files) {
  const title = path.basename(file, path.extname(file));

  insertArtwork.run(
    title,
    `/assets/museum/art/${file}`
  );
}

console.log(`${files.length} artworks added to the database!`);