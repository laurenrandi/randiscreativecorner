import Background from "@/components/Background";
import Scrapbooks from "@/components/film-studio/scrapbooks/Scrapbooks";
export default function ScrapbooksPage() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Scrapbooks />
    </main>
  );
}