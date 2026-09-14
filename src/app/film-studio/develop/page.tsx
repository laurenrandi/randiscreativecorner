import Background from "@/components/Background";
import DevelopRoom from "@/components/film-studio/develop/DevelopRoom";

export default function DevelopPage() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "black",
      }}
    >

      {/* Develop Studio room */}
      <DevelopRoom />
    </main>
  );
}