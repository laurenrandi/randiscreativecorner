import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const drawingsPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "museum",
    "drawings"
  );

  const files = fs.readdirSync(drawingsPath);

  const drawings = files.filter((file) =>
    /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
  );

  return NextResponse.json(drawings);
}