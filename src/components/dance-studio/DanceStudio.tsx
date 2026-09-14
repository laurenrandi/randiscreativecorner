import Image from "next/image";
import MusicPlayer from "../MusicPlayer";

export default function DanceStudio() {
  return (
    <>
      {/* FILM STUDIO */}
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
    </>
  );
}