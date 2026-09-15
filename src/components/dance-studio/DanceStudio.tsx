"use client";

import Image from "next/image";
import { useState } from "react";

const views = [
  "/assets/dance-studio/boomboxwalllll.png",
  "/assets/dance-studio/wall1.png",
  "/assets/dance-studio/exit.png",
  "/assets/dance-studio/wall2.png",
];

export default function DanceStudio() {
  const [currentView, setCurrentView] = useState(0);

  const turnRight = () => {
    setCurrentView((current) => (current + 1) % views.length);
  };

  const turnLeft = () => {
    setCurrentView(
      (current) => (current - 1 + views.length) % views.length
    );
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
      {/* ROOM */}
      <div
        style={{
          position: "absolute",
          width: "80vw",
          aspectRatio: "1920 / 1080",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* WALL */}
        <Image
          src={views[currentView]}
          alt="Dance Studio"
          fill
          priority
          style={{
            objectFit: "contain",
          }}
        />

        {/* BOOMBOX GIF */}
        {currentView === 0 && (
          <div
            style={{
              position: "absolute",
              width: "92%",
              height: "92%",
              left: "3%",
              top: "0%",
              zIndex: 2,
            }}
          >
            <Image
              src="/assets/dance-studio/boombox1.gif"
              alt="Boombox"
              fill
              priority
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        )}
        {/* dancedancce GIF */}
        {currentView === 1 && (
          <div
            style={{
              position: "absolute",
              width: "45%",
              height: "45%",
              left: "28%",
              bottom: "15%",
              zIndex: 2,
            }}
          >
            <Image
              src="/assets/dance-studio/dancedance.png"
              alt="Boombox"
              fill
              priority
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={turnLeft}
        style={{
          position: "absolute",
          left: "12%",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          fontSize: "40px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        ←
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={turnRight}
        style={{
          position: "absolute",
          right: "12%",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          fontSize: "40px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        →
      </button>
    </div>
  );
}