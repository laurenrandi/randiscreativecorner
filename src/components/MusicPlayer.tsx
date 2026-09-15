"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const pathname = usePathname();

  const isDarkRoom =
    pathname === "/film-studio/develop";

  const isMuseum =
    pathname === "/museum";

  const isDanceStudio = pathname.startsWith("/dance-studio");

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.25;

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        console.log(
          "Autoplay was blocked by the browser."
        );
      });
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isDarkRoom) {
      audio.src =
        "/assets/music/westsideantics.mp3";
    } else if (isMuseum) {
      audio.src =
        "/assets/music/treetopaper.mp3";
    } else if (isDanceStudio) {
      audio.src =
        "/assets/music/fancyfootwork.mp3";
    } else {
      audio.src =
        "/assets/music/sabbatical.mp3";
    }

    audio.load();

    if (isPlaying) {
      audio.play().catch(() => {
        console.log(
          "Music playback was blocked."
        );
      });
    }
  }, [isDarkRoom, isMuseum, isDanceStudio]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        loop
      />

      <button
  className="music-button"
  onClick={toggleMusic}
  aria-label="Toggle background music"
>
  <img
    src={
      isPlaying
        ? "/assets/music/volumeon.png"
        : "/assets/music/volumeoff.png"
    }
    alt={isPlaying ? "Music on" : "Music off"}
  />
</button>
    </div>
  );
}