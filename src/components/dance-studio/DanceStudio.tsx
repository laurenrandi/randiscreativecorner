"use client";

import Image from "next/image";
import { useState } from "react";

const views = [
  "/assets/dance-studio/danceview3.png",
  "/assets/dance-studio/arcadeview.png",
  "/assets/dance-studio/exitview1.png",
  "/assets/dance-studio/movieview.png",
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
        {/* exit sign */}
        {currentView === 2 && (
  <>
     <div
      style={{
        position: "absolute",
        width: "45%",
        height: "45%",
        left: "48.5%",
        top: "31%",
        zIndex: 2,
      }}
    >
      <Image
        src="/assets/dance-studio/glowexit.png"
        alt="Boombox"
        fill
        priority
        className="exit-blink"
        style={{
          objectFit: "contain",
        }}
      />
    </div>
    </>)}
        {/* DANCE REV GIF */}
        {currentView === 1 && (
  <>
     <div
      style={{
        position: "absolute",
        width: "40%",
        height: "40%",
        left: "40%",
        top: "0%",
        zIndex: 2,
      }}
    >
      <Image
        src="/assets/dance-studio/revolution.gif"
        alt="Boombox"
        fill
        priority
        style={{
          objectFit: "contain",
        }}
      />
    </div>
    </>)}
    {/* sevani water gif */}
        {currentView === 3 && (
  <>
     <div
      style={{
        position: "absolute",
        width: "20%",
        height: "20%",
        left: "40%",
        top: "31%",
        zIndex: 2,
      }}
    >
      <Image
        src="/assets/dance-studio/moosewater.gif"
        alt="Boombox"
        fill
        priority
        style={{
          objectFit: "contain",
        }}
      />
    </div>
    </>)}
    {/* arcade */}
        {currentView === 1 && (
  <>
     <div
      style={{
        position: "absolute",
        width: "15%",
        height: "15%",
        left: "23%",
        top: "47%",
        zIndex: 2,
      }}
    >
      <Image
        src="/assets/dance-studio/arcade.png"
        alt="Boombox"
        fill
        priority
        className="arcade-blink"
        style={{
          objectFit: "contain",
        }}
      />
    </div>
    </>)}
    {/* revolution game */}
        {currentView === 1 && (
  <>
     <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0%",
        top: "0%",
        zIndex: 2,
      }}
    >
      <Image
        src="/assets/dance-studio/revmachine.png"
        alt="Boombox"
        fill
        priority
        className="revolution-blink"
        style={{
          objectFit: "contain",
        }}
      />
    </div>
    </>)}

{/* BOOMBOX + DANCE VIDEO */}
{currentView === 0 && (
  <>
    {/* BOOMBOX GIF */}
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0%",
        top: "0%",
        zIndex: 2,
      }}
    >
      <Image
        src="/assets/dance-studio/angledboombox.gif"
        alt="Boombox"
        fill
        priority
        style={{
          objectFit: "contain",
        }}
      />
    </div>

    {/* DANCE VIDEO */}
    <div
      style={{
        position: "absolute",
        width: "99%",
        height: "99%",
        left: "16.8%",
        top: "31.2%",
        zIndex: 3,
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          width: "35%",
          height: "35%",
          objectFit: "contain",
        }}
      >
        <source
          src="/assets/dance-studio/dancetest2.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  </>
)} </div>

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
          color: "pink"
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
          color: "pink"
        }}
      >
        →
      </button>
    </div>
  );
}