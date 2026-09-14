import Image from "next/image";
import StudioShelf from "./FilmStudioObjects/StudioShelf";
import StudioTable from "./FilmStudioObjects/StudioTable";
import DevelopDoor from "./FilmStudioObjects/DevelopDoor";
import DoorLights from "./FilmStudioObjects/DoorLights";

export default function FilmStudioRoom() {
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
          src="/assets/film-studio/cleanedroom1.png"
          alt="Film Studio"
          fill
          priority
          style={{
            objectFit: "contain",
          }}
        />

        <StudioShelf />
        <StudioTable />
        <DevelopDoor />
        <DoorLights />
      </div>

      {/* BOTTOM-RIGHT OVERLAY */}
      <div
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "40vw",
          zIndex: 100,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/assets/film-studio/meindastudio.png"
          alt=""
          width={500}
          height={500}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </>
  );
}