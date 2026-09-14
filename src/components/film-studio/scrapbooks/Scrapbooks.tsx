"use client";

import Image from "next/image";
import Link from "next/link";

export default function Scrapbooks() {
  return (
    <div
      style={{
        position: "absolute",
        width: "min(90vw, 1200px)",
        aspectRatio: "1920 / 1080",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
      }}
    >
      {/* Zoomed-in bookshelf */}
      <Image
        src="/assets/film-studio/scrapbooks/bookshelfzoom1.png"
        alt="Scrapbook bookshelf"
        fill
        priority
        style={{
          objectFit: "contain",
        }}
      />

      {/* Clickable scrapbook */}
      <Link
        href="/film-studio/scrapbooks/table"
        style={{
          position: "absolute",
          left: "45%",
          top: "35%",
          width: "15%",
          height: "25%",
          zIndex: 10,
        }}
      >
        {/* Put your scrapbook image here later */}
      </Link>
    </div>
  );
}