import db from "./db";

const artworks = db
  .prepare("SELECT * FROM artworks")
  .all();

console.log(artworks);