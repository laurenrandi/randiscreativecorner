import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const portraitsPath = path.join(
    process.cwd(),
    "public",
    "photos",
    "portraits"
  );

  const files = fs.readdirSync(portraitsPath);

  const images = files.filter((file) =>
    /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
  );

  return NextResponse.json(images);
}