import db from "../../../../database/db";

export async function GET() {
  const artworks = db
    .prepare("SELECT * FROM artworks")
    .all();

  return Response.json(artworks);
}