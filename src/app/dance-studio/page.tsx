import DanceStudio from "@/components/dance-studio/DanceStudio";

export default function DanceStudioPage() {
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
      <DanceStudio />
    </main>
  );
}