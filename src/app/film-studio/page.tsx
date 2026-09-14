import Background from "@/components/Background";
import FilmStudioRoom from "@/components/film-studio/FilmStudioRoom";
import StudioShelf from "@/components/film-studio/FilmStudioObjects/StudioShelf";
import StudioTable from "@/components/film-studio/FilmStudioObjects/StudioTable";
import DevelopDoor from "@/components/film-studio/FilmStudioObjects/DevelopDoor";
import DoorLights from "@/components/film-studio/FilmStudioObjects/DoorLights";
import Image from "next/image";

export default function FilmStudioPage() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      

      {/* Room */}
      <FilmStudioRoom />
  

    </main>
  );
}