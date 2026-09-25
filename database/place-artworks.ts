import db from "./db";

const artworks = db
  .prepare("SELECT id FROM artworks ORDER BY id")
  .all() as { id: number }[];

const updateArtwork = db.prepare(`
  UPDATE artworks
  SET x = ?, y = ?
  WHERE id = ?
`);

// Permanent museum layout
const positions = [
  // Main entrance → east gallery
  [400, 1500],
  [900, 1500],
  [1400, 1500],
  [1900, 1500],
  [2400, 1500],
  [2900, 1500],
  [3400, 1500],
  [3900, 1500],
  [4400, 1500],

  // Turn north
  [4400, 1100],
  [4000, 1100],
  [3600, 1100],
  [3200, 1100],
  [2800, 1100],
  [2400, 1100],
  [2000, 1100],

  // Turn west
  [2000, 700],
  [2400, 700],
  [2800, 700],
  [3200, 700],
  [3600, 700],
  [4000, 700],
  [4400, 700],

  // Upper gallery
  [4400, 350],
  [3900, 350],
  [3400, 350],
  [2900, 350],
  [2400, 350],
  [1900, 350],
  [1400, 350],

  // Return toward center
  [1400, 700],
  [1000, 700],
  [600, 700],

  // Lower gallery
  [600, 2100],
  [1000, 2100],
  [1400, 2100],
  [1800, 2100],
  [2200, 2100],
  [2600, 2100],
  [3000, 2100],

  // Turn east
  [3000, 2500],
  [3400, 2500],
  [3800, 2500],
  [4200, 2500],
  [4600, 2500],

  // Final gallery
  [4600, 2850],
  [4100, 2850],
  [3600, 2850],
  [3100, 2850],
  [2600, 2850],
  [2100, 2850],
  [1600, 2850],
  [1100, 2850],
  [600, 2850],
];
artworks.forEach((artwork, index) => {
  const position = positions[index];

  if (!position) return;

  updateArtwork.run(position[0], position[1], artwork.id);
});

console.log(`${Math.min(artworks.length, positions.length)} artworks positioned!`);