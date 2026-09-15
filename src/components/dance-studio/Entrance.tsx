"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const photos = [
  "/assets/dance-studio/closeddoor.png",
  "/assets/dance-studio/opendoor.png",
  "/assets/dance-studio/tunnel.png",
  "/assets/dance-studio/thevault.png",
];

export default function Entrance() {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const isLastPhoto = currentPhoto === photos.length - 1;

  const handleClick = () => {
    if (!isLastPhoto) {
      setCurrentPhoto((current) => current + 1);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isLastPhoto ? (
        <Link
          href="/dance-studio/room"
          style={{
            position: "absolute",
            inset: 0,
            cursor: "pointer",
          }}
        >
          <Image
            src={photos[currentPhoto]}
            alt="Enter Dance Studio"
            fill
            priority
            style={{
              objectFit: "contain",
            }}
          />
        </Link>
      ) : (
        <button
          onClick={handleClick}
          style={{
            position: "absolute",
            inset: 0,
            border: "none",
            padding: 0,
            background: "none",
            cursor: "pointer",
          }}
        >
          <Image
            src={photos[currentPhoto]}
            alt="Dance Studio entrance"
            fill
            priority
            style={{
              objectFit: "contain",
            }}
          />
        </button>
      )}
    </div>
  );
}