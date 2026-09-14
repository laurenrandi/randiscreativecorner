import Background from "@/components/Background";
import ScrapbookTable from "@/components/film-studio/scrapbooks/ScrapbookTable";

export default function ScrapbookTablePage() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Background />
      <ScrapbookTable />
    </main>
  );
}